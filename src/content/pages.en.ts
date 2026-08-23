import { PERSONAL } from '@/constants/data';
import type { PageContent } from './blocks';

export const ABOUT_EN: PageContent = {
  title: 'About Urban Vidovič',
  summary:
    'Software engineer from Maribor, Slovenia, working on decentralized identity, verifiable credentials, and Web3 product engineering.',
  blocks: [
    {
      kind: 'paragraph',
      text: `I am a Research & Development Engineer at [Blockchain Lab:UM](${PERSONAL.companyUrl}) and COO and co-founder of [Lutra Labs](${PERSONAL.company2Url}). Both roles are hands-on. The through-line across everything I build is digital identity — proving who someone is, and what they are entitled to, without forcing them to hand over more than necessary.`,
    },
    {
      kind: 'paragraph',
      text: 'In practice that means standards turned into running software: OpenID for Verifiable Credential Issuance, ISO mDoc/mDL, W3C Verifiable Credentials and DIDs, and the wallet and issuer infrastructure that makes them usable. Alongside identity I work on DeFi protocols in Solidity and Sway, developer tooling, and the operational plumbing that keeps it all online.',
    },
    {
      kind: 'paragraph',
      text: 'I would rather own a feature from the protocol layer through to the interface than hand it across three teams. Threat modelling and key management are design inputs, not a review gate at the end.',
    },
    { kind: 'heading', level: 2, text: 'Background' },
    {
      kind: 'paragraph',
      text: `Master of Science in Computer Science from the [Faculty of Electrical Engineering and Computer Science, University of Maribor](${PERSONAL.universityUrl}), where I also did my bachelor's. At Blockchain Lab:UM since 2021; co-founded Lutra Labs in 2024. I work in Slovene and English, and read German.`,
    },
    {
      kind: 'paragraph',
      text: `Selected work is on the [projects page](/en/projects/), code on [GitHub](${PERSONAL.github}), and the full [CV](/cv/) is available as a page and a PDF. For anything else, see [contact](/en/contact/).`,
    },
  ],
};

export const CONTACT_EN: PageContent = {
  title: 'Contact',
  summary:
    'Email is the reliable channel and reaches me directly. Everything below is a verified account — if an approach claiming to be me arrives anywhere else, treat it with suspicion.',
  blocks: [
    {
      kind: 'definitions',
      items: [
        {
          term: 'Email',
          description: `[${PERSONAL.email}](mailto:${PERSONAL.email}) — the best way to reach me.`,
        },
        {
          term: 'PGP',
          description: `Public key on [Keybase](${PERSONAL.keybase}), with a signed proof tying it to this domain. Use it for anything sensitive, including vulnerability reports.`,
        },
        { term: 'GitHub', description: `[github.com/pseudobun](${PERSONAL.github})` },
        { term: 'LinkedIn', description: `[linkedin.com/in/urbanvidovic](${PERSONAL.linkedin})` },
        { term: 'X', description: `[@pseudourban](${PERSONAL.twitter})` },
        { term: 'Telegram', description: `[t.me/pseudobun](${PERSONAL.telegram})` },
        { term: 'Farcaster', description: `[pseudobun.eth](${PERSONAL.farcaster})` },
      ],
    },
    { kind: 'heading', level: 2, text: 'What to reach out about' },
    {
      kind: 'list',
      items: [
        'Decentralized identity and verifiable credential work — issuance, wallets, verification, or an mDoc/OID4VC integration that is not behaving.',
        'Applied research projects that need a working reference implementation rather than a report.',
        'Protocol or smart-contract engagements, including reviews of an existing design.',
        'Security disclosures affecting anything I maintain. Use PGP.',
      ],
    },
    {
      kind: 'paragraph',
      text: 'Not interested in unsolicited recruitment, token-launch pitches, paid promotion, or SEO placements.',
    },
    {
      kind: 'paragraph',
      text: 'Based in Maribor, Slovenia (CET). I work across European time zones and can usually overlap with the US East Coast in my afternoon.',
    },
  ],
};

export const PRIVACY_EN: PageContent = {
  title: 'Privacy',
  summary:
    'This is a personal site. No accounts, no login, no comments, no forms, no advertising, and no cookies. The only data collected is aggregate, cookieless traffic measurement.',
  blocks: [
    { kind: 'heading', level: 2, text: 'What is collected' },
    {
      kind: 'paragraph',
      text: 'This site runs [Vercel Web Analytics](https://vercel.com/docs/analytics/privacy-policy) and [Vercel Speed Insights](https://vercel.com/docs/speed-insights/privacy-policy). Both are cookieless and record page views and performance measurements in aggregate. They do not store an identifier on your device or track you between visits or across other sites.',
    },
    {
      kind: 'paragraph',
      text: 'As with any website, the hosting and CDN layers process request metadata such as IP address, user agent, and requested URL in order to serve the page and mitigate abuse. That processing is operational and short-lived; I do not receive or retain those logs as an identifiable dataset.',
    },
    { kind: 'heading', level: 2, text: 'What is not collected' },
    {
      kind: 'list',
      items: [
        'No cookies, so there is no cookie banner to dismiss.',
        'No accounts, sign-ups, newsletters, or contact forms — nothing here to submit personal data to.',
        'No advertising, ad networks, retargeting pixels, or social tracking widgets.',
        'Nothing is sold or shared with data brokers. There is no data to sell.',
      ],
    },
    { kind: 'heading', level: 2, text: 'Third parties' },
    {
      kind: 'definitions',
      items: [
        { term: 'Vercel', description: 'Hosting, serverless functions, and the analytics above.' },
        { term: 'Cloudflare', description: 'DNS and CDN, including transport security.' },
        {
          term: 'Supabase',
          description:
            'Holds a periodic snapshot of my aggregate public GitHub statistics. No visitor data whatsoever.',
        },
      ],
    },
    {
      kind: 'paragraph',
      text: 'Fonts are self-hosted and the social preview image and CV PDF are generated on this domain, so no third party sees your request for them. Outbound links are ordinary links — once you follow one, that service’s policy applies.',
    },
    { kind: 'heading', level: 2, text: 'Your rights' },
    {
      kind: 'paragraph',
      text: `Under the GDPR you have rights of access, rectification, erasure, restriction, portability, and objection. Because this site holds no personal data that can be linked to you, there is in practice nothing to look up, export, or delete. If you believe otherwise, write to [${PERSONAL.email}](mailto:${PERSONAL.email}) and I will investigate.`,
    },
  ],
};
