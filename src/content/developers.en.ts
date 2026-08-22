import { PERSONAL } from '@/constants/data';
import type { PageContent } from './blocks';

export const DEVELOPERS_EN: PageContent = {
  title: 'Developers — pseudobun.dev',
  summary:
    'Everything on pseudobun.dev that is meant to be read by a machine: two public read-only endpoints, an OpenAPI specification, Markdown representations of every page, and the open-source projects behind the work described here.',
  blocks: [
    { kind: 'heading', level: 2, text: 'What this is, and what it is not' },
    {
      kind: 'paragraph',
      text: 'This is the personal site of Urban Vidovič, not a product. There is no product API, no account system, no API keys, no OAuth, no webhooks, and no sandbox environment — if you are looking for those, you are looking for the wrong domain. What does exist is documented here honestly and completely.',
    },
    {
      kind: 'paragraph',
      text: 'Everything below is public, unauthenticated, and read-only. You do not need to register, request access, or send a token. Please be reasonable with request volume: the host applies automatic bot mitigation, and sustained automated traffic can trip it and temporarily challenge every visitor to the site.',
    },
    { kind: 'heading', level: 2, text: 'Public endpoints' },
    {
      kind: 'definitions',
      items: [
        {
          term: 'GET /api/cv/',
          description:
            'Renders the current CV to a PDF and returns it as an attachment (`application/pdf`, filename `urban-vidovic-cv.pdf`). Generated per request from the same source data as the HTML CV, so the two cannot diverge. Takes no parameters.',
        },
        {
          term: 'GET /api/og/',
          description:
            'Returns the 1200x630 PNG social preview image for this site, including a daily snapshot of aggregate public GitHub contribution statistics. Takes no parameters.',
        },
      ],
    },
    {
      kind: 'code',
      language: 'bash',
      code: `curl -sSL -o cv.pdf https://pseudobun.dev/api/cv/
curl -sSL -o preview.png https://pseudobun.dev/api/og/`,
    },
    { kind: 'heading', level: 2, text: 'OpenAPI specification' },
    {
      kind: 'paragraph',
      text: 'The full machine-readable description lives at [/openapi.json](/openapi.json). It is OpenAPI 3.1.0, with a unique `operationId` and a description on every operation, typed response schemas, and an explicitly empty security scheme — which is how a client can tell that no credentials are expected rather than merely missing.',
    },
    {
      kind: 'code',
      language: 'bash',
      code: "curl -sS https://pseudobun.dev/openapi.json | jq '.paths | keys'",
    },
    { kind: 'heading', level: 2, text: 'Errors' },
    {
      kind: 'paragraph',
      text: 'Every failure under `/api` returns `application/problem+json` rather than an HTML error page, so a client never has to scrape a stack trace. The body always carries a stable `code`, a human-readable `message`, a `hint` naming the next thing to try, the `status`, and a `documentation_url` pointing back here.',
    },
    {
      kind: 'code',
      language: 'json',
      code: `{
  "error": {
    "code": "not_found",
    "message": "No such endpoint.",
    "hint": "The published endpoints are GET /api/cv/ and GET /api/og/. See /openapi.json for the full specification.",
    "status": 404,
    "documentation_url": "https://pseudobun.dev/en/developers/"
  }
}`,
    },
    {
      kind: 'paragraph',
      text: 'Defined codes are `not_found` (404), `method_not_allowed` (405, with an `Allow` header), `internal_error` (500), and `upstream_unavailable` (503).',
    },
    { kind: 'heading', level: 2, text: 'Markdown for agents' },
    {
      kind: 'paragraph',
      text: 'Every page on this site has a Markdown representation at the same URL. Send `Accept: text/markdown` and you get Markdown instead of HTML, per [acceptmarkdown.com](https://acceptmarkdown.com); those responses set `Vary: Accept`. A request that accepts neither `text/html` nor `text/markdown` gets a `406`. Quality values are honoured, so `text/markdown;q=0.9, text/html;q=0.8` resolves to Markdown.',
    },
    {
      kind: 'code',
      language: 'bash',
      code: 'curl -sS -H "Accept: text/markdown" https://pseudobun.dev/en/about/',
    },
    { kind: 'heading', level: 2, text: 'Machine-readable files' },
    {
      kind: 'definitions',
      items: [
        {
          term: '/llms.txt',
          description:
            'Site index in [llmstxt.org](https://llmstxt.org) format, including an explicit "when to use this site" section. Start here.',
        },
        {
          term: '/agent.txt',
          description: 'The same guidance plus protocol notes, for tooling that probes this path.',
        },
        { term: '/openapi.json', description: 'OpenAPI 3.1.0 description of the endpoints above.' },
        { term: '/sitemap.xml', description: 'Every canonical URL, with hreflang alternates.' },
        { term: '/robots.txt', description: 'Crawl policy.' },
        {
          term: '/.well-known/keybase.txt',
          description: 'Signed proof binding this domain to the Keybase identity.',
        },
      ],
    },
    { kind: 'heading', level: 2, text: 'Open-source projects' },
    {
      kind: 'paragraph',
      text: `The work described on this site is mostly public. Source for the projects below is on [GitHub](${PERSONAL.github}); each has its own documentation and release process in its own repository, and none of it is served from this domain.`,
    },
    {
      kind: 'definitions',
      items: [
        {
          term: 'Masca',
          description:
            'A MetaMask Snap for decentralized identity — manage DIDs and verifiable credentials in the MetaMask wallet. [masca.io](https://masca.io)',
        },
        {
          term: 'LutraID',
          description:
            'Standards-based platform for issuing and verifying digital documents (OID4VCI, ISO mDoc). [id.lutralabs.io](https://id.lutralabs.io)',
        },
        {
          term: 'Swaylend',
          description:
            'Lending protocol on Fuel Network, written in Sway. [swaylend.com](https://swaylend.com)',
        },
        {
          term: 'EduCTX',
          description:
            'Educational verifiable credentials conforming to W3C decentralized identity standards. [platform2.eductx.org](https://platform2.eductx.org)',
        },
      ],
    },
    { kind: 'heading', level: 2, text: 'Getting in touch' },
    {
      kind: 'paragraph',
      text: `Integration questions, bug reports about anything above, and security disclosures all go to [${PERSONAL.email}](mailto:${PERSONAL.email}) — use the PGP key on [Keybase](${PERSONAL.keybase}) for anything sensitive. Full details on the [contact page](/en/contact/).`,
    },
  ],
};
