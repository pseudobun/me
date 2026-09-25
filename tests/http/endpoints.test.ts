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
    expect(body).toContain('/en/projects/');
    expect(body).toContain('/en/about/');
    // The machine-readable index lives in the Markdown variant, not here.
    expect(body).not.toContain('/sitemap.xml');
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
  const pages = [
    '/en/',
    '/en/about/',
    '/en/contact/',
    '/en/privacy/',
    '/en/projects/',
    '/cv/',
  ];

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

  // Prerendered pages are served from the ISR cache with Next's own Vary, which
  // the proxy cannot override (see the note on withVaryAccept in src/proxy.ts).
  // Assert what actually holds; the Markdown responses carry Accept and are
  // covered separately below.
  it('keeps the Next.js router entries in Vary on HTML responses', async () => {
    const vary = ((await get('/en/', { accept: BROWSER_ACCEPT })).headers.get('vary') ?? '')
      .toLowerCase()
      .split(',')
      .map((part) => part.trim());

    expect(vary).toContain('rsc');
    expect(vary).toContain('next-router-state-tree');
  });

  it('sets Vary: Accept on every markdown response', async () => {
    for (const path of pages) {
      const vary = ((await get(path, { accept: 'text/markdown' })).headers.get('vary') ?? '')
        .toLowerCase()
        .split(',')
        .map((part) => part.trim());

      expect(vary).toContain('accept');
    }
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

    expect(body).toContain('## Background');
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
  // The homepage is deliberately short. Heading-count and content-efficiency
  // thresholds used to live here; they were audit targets that drove the copy
  // rather than the other way around, and have been dropped on purpose.
  it('server-renders exactly one visible H1 and real content', async () => {
    const html = await (await get('/en/', { accept: BROWSER_ACCEPT })).text();

    const h1 = html.match(/<h1[^>]*>/g) ?? [];

    expect(h1.length).toBe(1);
    // A sr-only H1 reads as "no heading" to visible-text extractors, which is
    // what made the structure look flat. The element itself must be visible.
    expect(h1[0]).not.toMatch(/class="[^"]*\bsr-only\b/);

    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, '')
      .replace(/<style[\s\S]*?<\/style>/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    expect(text.length).toBeGreaterThan(500);
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

  it('serves agent.txt as a pointer with the protocol notes', async () => {
    const response = await get('/agent.txt');
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain('## Protocol notes');
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

describe('OpenAPI specification endpoint', () => {
  it('serves a parseable OpenAPI 3.1 document as JSON', async () => {
    const response = await get('/openapi.json');

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/json');

    const doc = await response.json();

    expect(doc.openapi).toBe('3.1.0');
    expect(Object.keys(doc.paths)).toEqual(['/api/cv/', '/api/og/']);
    expect(doc.paths['/api/cv/'].get.operationId).toBe('getCurriculumVitae');
    expect(doc.paths['/api/og/'].get.operationId).toBe('getOpenGraphImage');
  });

  it('is fetchable cross-origin so browser-based agents can read it', async () => {
    const response = await get('/openapi.json');

    expect(response.headers.get('access-control-allow-origin')).toBe('*');
  });

  it('is not locale-redirected', async () => {
    const response = await get('/openapi.json', { accept: BROWSER_ACCEPT });

    expect(response.status).toBe(200);
  });
});

describe('JSON error responses', () => {
  it('returns problem+json for an unknown /api path', async () => {
    const response = await get('/api/does-not-exist/');
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(response.headers.get('content-type')).toContain('application/problem+json');
    expect(body.error.code).toBe('not_found');
    expect(body.error.status).toBe(404);
    expect(body.error.message.length).toBeGreaterThan(0);
    expect(body.error.hint).toContain('/openapi.json');
    expect(body.error).not.toHaveProperty('documentation_url');
  });

  it('never returns HTML from an /api failure', async () => {
    const response = await get('/api/nope/');

    expect(response.headers.get('content-type')).not.toContain('text/html');
  });

  for (const path of ['/api/cv/', '/api/og/']) {
    it(`${path} rejects a write method with a JSON 405 and an Allow header`, async () => {
      const response = await fetch(`${base}${path}`, { method: 'POST', redirect: 'manual' });
      const body = await response.json();

      expect(response.status).toBe(405);
      expect(response.headers.get('allow')).toBe('GET, HEAD, OPTIONS');
      expect(body.error.code).toBe('method_not_allowed');
      expect(body.error.hint).toContain('GET');
    });
  }

  it('still serves the real endpoints on GET', async () => {
    const cv = await get('/api/cv/');

    expect(cv.status).toBe(200);
    expect(cv.headers.get('content-type')).toContain('application/pdf');
  });
});

describe('developer resource discoverability', () => {
  it('names the developer resources in llms.txt', async () => {
    const body = await (await get('/llms.txt')).text();

    expect(body).toContain('## Developer resources');
    expect(body).toContain('/openapi.json');
    expect(body).toContain('getCurriculumVitae');
  });

  // The audit read a CLI into llms.txt that was never there. Keep the file
  // explicit that no CLI, SDK, or product API exists, so it cannot be inferred.
  it('states plainly that there is no CLI, SDK, or product API', async () => {
    const body = await (await get('/llms.txt')).text();

    expect(body).toContain('no first-party CLI or SDK');
    expect(body).toContain('no API keys');
  });

});

describe('retired /developers page', () => {
  // It shipped once, so the removal needs pinning rather than assuming.
  for (const path of ['/en/developers/', '/sl/developers/']) {
    it(`${path} is gone`, async () => {
      const response = await get(path, { accept: BROWSER_ACCEPT });

      expect(response.status).toBe(404);
    });
  }

  it('is absent from the sitemap and llms.txt', async () => {
    const [sitemap, llms] = await Promise.all([
      (await get('/sitemap.xml')).text(),
      (await get('/llms.txt')).text(),
    ]);

    expect(sitemap).not.toContain('/developers/');
    expect(llms).not.toContain('/developers/');
  });
});

describe('projects page payload', () => {
  // Brand icons used to be threaded through props as raw SVG strings, so React
  // serialized each one into the RSC payload once per card — ~43 KB for two
  // icons, including on the 6 cards that render neither. They are client
  // components now, so the payload references the component and the markup
  // appears only where it is actually drawn.
  it('keeps brand icon path data out of the RSC payload', async () => {
    const html = await (await get('/en/projects/', { accept: BROWSER_ACCEPT })).text();
    const flight = (html.match(/<script>self\.__next_f[\s\S]*?<\/script>/g) ?? []).join('');
    const longPaths = flight.match(/d=\\"M[^"]{400,}/g) ?? [];

    // The Footer is a server component and legitimately contributes one icon.
    expect(longPaths.length).toBeLessThanOrEqual(1);
  });

  it('renders the App Store icon only where there is an App Store link', async () => {
    const html = await (await get('/en/projects/', { accept: BROWSER_ACCEPT })).text();

    // Exactly one of the 15 projects has an App Store link. This icon used to
    // be serialized 15 times regardless — once per card, including the 14 that
    // never draw it.
    expect(html.split('M10.445 21.372').length - 1).toBeLessThanOrEqual(2);
  });

  it('does not ship blurDataURL for images that never use placeholder=blur', async () => {
    const html = await (await get('/en/projects/', { accept: BROWSER_ACCEPT })).text();

    expect(html).not.toContain('blurDataURL');
  });

  it('stays under a payload ceiling', async () => {
    const html = await (await get('/en/projects/', { accept: BROWSER_ACCEPT })).text();

    // 212 KB before the icon/image/srcSet/JSON-LD work, ~148 KB after. The
    // remainder is 39 KB of Tailwind class attributes and the RSC payload for
    // 15 interactive cards — structural, and not worth a redesign.
    expect(html.length).toBeLessThan(155_000);
  });

  it('still renders every project with its screenshot', async () => {
    const html = await (await get('/en/projects/', { accept: BROWSER_ACCEPT })).text();

    expect(html).toContain('LutraID');
    expect((html.match(/<img/g) ?? []).length).toBeGreaterThanOrEqual(14);
  });
});

describe('brand identity', () => {
  async function websiteNode() {
    const html = await (await get('/en/', { accept: BROWSER_ACCEPT })).text();
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
    const nodes = blocks.flatMap((match) => {
      const parsed = JSON.parse(match[1]);

      return Array.isArray(parsed) ? parsed : [parsed];
    });

    return nodes.find((node) => node['@type'] === 'WebSite');
  }

  it('leads with the person and keeps the nickname as alternateName', async () => {
    const site = await websiteNode();

    expect(site.name).toBe('Urban Vidovič');
    expect(site.alternateName).toBe('pseudobun');
  });

  it('uses the person as og:site_name', async () => {
    const html = await (await get('/en/', { accept: BROWSER_ACCEPT })).text();

    expect(html).toContain('<meta property="og:site_name" content="Urban Vidovič"/>');
  });

  it('keeps the visible nav lockup untouched', async () => {
    const html = await (await get('/en/', { accept: BROWSER_ACCEPT })).text();

    expect(html).toContain('>pseudo</span>bun</span>');
    expect(html).toContain('aria-label="pseudobun home"');
  });
});

describe('agent.txt', () => {
  it('is a short pointer to llms.txt, not a copy of it', async () => {
    const [agent, llms] = await Promise.all([
      (await get('/agent.txt')).text(),
      (await get('/llms.txt')).text(),
    ]);

    expect(agent).toContain('/llms.txt');
    expect(agent).toContain('Accept: text/markdown');
    expect(agent.length).toBeLessThan(llms.length / 2);
    expect(agent).not.toContain('## When to use this site');
  });
});
