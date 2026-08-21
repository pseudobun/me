import { spawn, type ChildProcess } from 'node:child_process';
import { createServer } from 'node:net';
import { setTimeout as sleep } from 'node:timers/promises';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { markdownPath } from '@/lib/md-route';

// End-to-end checks against a real production server. Run `pnpm build` first —
// these assert the behaviour the agent-readiness audit measures over HTTP,
// which cannot be observed from unit tests alone.

/** Ask the OS for a free port so a stray local service cannot fail the suite. */
function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.unref();
    probe.on('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const address = probe.address();
      if (typeof address === 'string' || address === null) {
        probe.close(() => reject(new Error('could not determine a free port')));
        return;
      }
      probe.close(() => resolve(address.port));
    });
  });
}

let base = '';
let server: ChildProcess | undefined;
let startupLog = '';

const BROWSER_ACCEPT =
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8';

function get(path: string, headers: Record<string, string> = {}) {
  return fetch(`${base}${path}`, { headers, redirect: 'manual' });
}

async function waitForServer() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await get('/en/', { accept: BROWSER_ACCEPT });
      if (response.status === 200) {
        return;
      }
    } catch {
      // not listening yet
    }
    await sleep(500);
  }

  throw new Error(`server did not become ready on ${base}\n${startupLog}`);
}

beforeAll(async () => {
  const port = process.env.TEST_PORT ? Number(process.env.TEST_PORT) : await freePort();
  base = `http://127.0.0.1:${port}`;

  server = spawn('node_modules/.bin/next', ['start', '--port', String(port)], {
    cwd: process.cwd(),
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const capture = (chunk: Buffer) => {
    startupLog += chunk.toString();
  };
  server.stdout?.on('data', capture);
  server.stderr?.on('data', capture);

  await waitForServer();
});

afterAll(() => {
  server?.kill('SIGTERM');
});

describe('locale negotiation', () => {
  it('sends a client with no language preference to the x-default locale', async () => {
    const response = await get('/', { accept: BROWSER_ACCEPT });

    expect(response.status).toBe(307);
    // Next emits a relative Location; compare the path, not the origin.
    expect(new URL(response.headers.get('location') ?? '', base).pathname).toBe('/en/');
  });

  it('still honours an explicit Slovene preference', async () => {
    const response = await get('/', { accept: BROWSER_ACCEPT, 'accept-language': 'sl-SI,sl;q=0.9' });

    expect(new URL(response.headers.get('location') ?? '', base).pathname).toBe('/sl/');
  });
});

describe('404 handling', () => {
  // Regression: `/[lang]` used to match any single-segment path, so /llms.txt
  // and friends returned the homepage with a 200 — telling agents that every
  // URL on the site exists.
  const missing = ['/en/does-not-exist/', '/sl/nope/', '/en/projects/deeper/'];

  for (const path of missing) {
    it(`returns a real 404 for ${path}`, async () => {
      const response = await get(path, { accept: BROWSER_ACCEPT });

      expect(response.status).toBe(404);
    });
  }

  it('never returns 200 for an unknown single-segment path', async () => {
    const response = await get('/definitely-not-a-page.txt', { accept: BROWSER_ACCEPT });

    expect(response.status).not.toBe(200);
  });

  it('serves an HTML 404 body with recovery links', async () => {
    const response = await get('/en/missing-page/', { accept: BROWSER_ACCEPT });
    const body = await response.text();

    expect(response.status).toBe(404);
    expect(body).toContain('/llms.txt');
    expect(body).toContain('/sitemap.xml');
    expect(body).toContain('/en/projects/');
  });

  it('serves a markdown 404 body when markdown is requested', async () => {
    const response = await get('/en/missing-page/', { accept: 'text/markdown' });
    const body = await response.text();

    expect(response.status).toBe(404);
    expect(response.headers.get('content-type')).toContain('text/markdown');
    expect(body).toMatch(/^# 404/);
    expect(body).toContain('/llms.txt');
    expect(body).toContain('/sitemap.xml');
  });
});

describe('acceptmarkdown.com compliance', () => {
  const pages = ['/en/', '/en/about/', '/en/contact/', '/en/privacy/', '/en/projects/', '/cv/'];

  for (const path of pages) {
    it(`${path} serves text/markdown with Vary: Accept`, async () => {
      const response = await get(path, { accept: 'text/markdown' });
      const body = await response.text();

      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
      expect(response.headers.get('vary')?.toLowerCase()).toContain('accept');
      expect(body.startsWith('# ')).toBe(true);
    });

    it(`${path} still serves HTML to a browser, with Vary: Accept`, async () => {
      const response = await get(path, { accept: BROWSER_ACCEPT });

      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toContain('text/html');
      expect(response.headers.get('vary')?.toLowerCase()).toContain('accept');
    });
  }

  it('rejects an unsupported Accept with 406', async () => {
    const response = await get('/en/', { accept: 'application/json' });

    expect(response.status).toBe(406);
    expect(response.headers.get('vary')?.toLowerCase()).toContain('accept');
  });

  it('honours q-values: html outranked by markdown', async () => {
    const response = await get('/en/', { accept: 'text/html;q=0.4, text/markdown;q=0.9' });

    expect(response.headers.get('content-type')).toContain('text/markdown');
  });

  it('honours q-values: markdown outranked by html', async () => {
    const response = await get('/en/', { accept: 'text/markdown;q=0.4, text/html;q=0.9' });

    expect(response.headers.get('content-type')).toContain('text/html');
  });

  it('keeps the Next.js router entries in Vary alongside Accept', async () => {
    const vary = (await get('/en/', { accept: BROWSER_ACCEPT })).headers.get('vary') ?? '';

    expect(vary.toLowerCase()).toContain('accept');
    expect(vary.toLowerCase()).toContain('rsc');
  });

  it('does not negotiate RSC requests', async () => {
    const response = await get('/en/', { accept: 'text/x-component', rsc: '1' });

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).not.toContain('text/markdown');
  });

  it('markdown mirrors the HTML page rather than 404ing', async () => {
    expect(markdownPath('/en/about/')).toBe('/md/en/about');
    expect(markdownPath('/cv/')).toBe('/md/cv');

    const body = await (await get('/en/about/', { accept: 'text/markdown' })).text();

    expect(body).toContain('## Focus areas');
    expect(body).toContain('Canonical HTML: https://pseudobun.dev/en/about/');
  });
});

describe('trust anchor pages', () => {
  for (const locale of ['en', 'sl']) {
    for (const page of ['about', 'contact', 'privacy']) {
      it(`/${locale}/${page}/ renders 500+ characters of text with an H1`, async () => {
        const response = await get(`/${locale}/${page}/`, { accept: BROWSER_ACCEPT });
        const html = await response.text();

        expect(response.status).toBe(200);

        const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/s);
        expect(h1).not.toBeNull();

        const text = html
          .replace(/<script[\s\S]*?<\/script>/g, '')
          .replace(/<style[\s\S]*?<\/style>/g, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        expect(text.length).toBeGreaterThan(500);
      });
    }
  }
});

describe('homepage rendering without JavaScript', () => {
  it('server-renders an H1, nested headings, and 500+ characters', async () => {
    const html = await (await get('/en/', { accept: BROWSER_ACCEPT })).text();

    const h1 = html.match(/<h1[^>]*>/g) ?? [];
    const h2 = html.match(/<h2[^>]*>/g) ?? [];
    const h3 = html.match(/<h3[^>]*>/g) ?? [];

    expect(h1.length).toBe(1);
    expect(h2.length).toBeGreaterThanOrEqual(2);
    // A flat H1-only structure was the audit finding; H3s prove real nesting.
    expect(h3.length).toBeGreaterThanOrEqual(3);

    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, '')
      .replace(/<style[\s\S]*?<\/style>/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    expect(text.length).toBeGreaterThan(500);
  });

  it('reaches at least 5% content efficiency', async () => {
    const html = await (await get('/en/', { accept: BROWSER_ACCEPT })).text();
    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, '')
      .replace(/<style[\s\S]*?<\/style>/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    expect((text.length / html.length) * 100).toBeGreaterThanOrEqual(5);
  });
});

describe('machine-readable files', () => {
  it('serves llms.txt in llmstxt.org format', async () => {
    const response = await get('/llms.txt');
    const body = await response.text();
    const lines = body.split('\n');

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/plain');

    // Spec order: H1, blank, blockquote summary, then H2 file lists.
    expect(lines[0].startsWith('# ')).toBe(true);
    expect(lines[2].startsWith('> ')).toBe(true);
    expect(body).toContain('## When to use this site');
    expect(body).toContain('## Optional');
    expect(body).toMatch(/^- \[.+\]\(https?:\/\/.+\): .+$/m);
  });

  it('serves agent.txt with explicit when-to-use guidance', async () => {
    const response = await get('/agent.txt');
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain('## When to use this site');
    expect(body).toContain('Accept: text/markdown');
    expect(body).toContain('/llms.txt');
  });

  it('serves robots.txt pointing at the sitemap and disallowing /md/', async () => {
    const body = await (await get('/robots.txt')).text();

    expect(body).toContain('Sitemap: https://pseudobun.dev/sitemap.xml');
    expect(body).toContain('Disallow: /md/');
  });

  it('lists the trust anchor pages in the sitemap with hreflang alternates', async () => {
    const body = await (await get('/sitemap.xml')).text();

    for (const page of ['about', 'contact', 'privacy']) {
      expect(body).toContain(`https://pseudobun.dev/en/${page}/`);
      expect(body).toContain(`https://pseudobun.dev/sl/${page}/`);
    }
    expect(body).not.toContain('/md/');
  });

  it('keeps the web manifest reachable', async () => {
    const response = await get('/site.webmanifest');

    expect(response.status).toBe(200);
  });
});

describe('structured data', () => {
  async function jsonLd(path: string) {
    const html = await (await get(path, { accept: BROWSER_ACCEPT })).text();
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];

    return blocks.flatMap((match) => {
      const parsed = JSON.parse(match[1]);

      return Array.isArray(parsed) ? parsed : [parsed];
    });
  }

  it('publishes an Organization with contactPoint and address', async () => {
    const nodes = await jsonLd('/en/');
    const org = nodes.find((node) => node['@type'] === 'Organization');

    expect(org).toBeDefined();
    expect(org.address).toMatchObject({ '@type': 'PostalAddress', addressCountry: 'SI' });
    expect(Array.isArray(org.contactPoint)).toBe(true);
    expect(org.contactPoint[0]).toMatchObject({ '@type': 'ContactPoint' });
    expect(org.contactPoint[0].email).toBeTruthy();
    expect(org.contactPoint[0].contactType).toBeTruthy();
  });

  it('keeps one Person entity shared across locales and the CV', async () => {
    const [en, sl, cv] = await Promise.all([jsonLd('/en/'), jsonLd('/sl/'), jsonLd('/cv/')]);
    const personId = (nodes: Record<string, unknown>[]) =>
      nodes.find((node) => node['@type'] === 'Person')?.['@id'];

    expect(personId(en)).toBe('https://pseudobun.dev/#person');
    expect(personId(sl)).toBe(personId(en));
    expect(personId(cv)).toBe(personId(en));
  });

  it('gives the trust anchor pages WebPage and BreadcrumbList schema', async () => {
    const nodes = await jsonLd('/en/about/');
    const types = nodes.map((node) => node['@type']);

    expect(types).toContain('WebPage');
    expect(types).toContain('BreadcrumbList');
  });
});
