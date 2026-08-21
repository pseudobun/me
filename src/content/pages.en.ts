import { PERSONAL } from '@/constants/data';
import type { PageContent } from './blocks';

export const ABOUT_EN: PageContent = {
  title: 'About Urban Vidovič',
  summary:
    'Software engineer from Maribor, Slovenia, working on decentralized identity, verifiable credentials, and Web3 product engineering — from smart contracts and backends through to the interfaces people actually use.',
  blocks: [
    { kind: 'heading', level: 2, text: 'What I do' },
    {
      kind: 'paragraph',
      text: `I am a Research & Development Engineer at [Blockchain Lab:UM](${PERSONAL.companyUrl}) and COO and co-founder of [Lutra Labs](${PERSONAL.company2Url}). Both roles are hands-on: I spend most of my time designing and shipping systems rather than managing from a distance. The through-line across everything I build is digital identity — proving who someone is, and what they are entitled to, without forcing them to hand over more than necessary.`,
    },
    {
      kind: 'paragraph',
      text: 'In practice that means standards work turned into running software: OpenID for Verifiable Credential Issuance, ISO mDoc/mDL, W3C Verifiable Credentials and DIDs, and the wallet and issuer infrastructure that makes them usable. Alongside identity I work on DeFi protocols, developer tooling, and the operational plumbing that keeps all of it online.',
    },
    { kind: 'heading', level: 2, text: 'Focus areas' },
    { kind: 'heading', level: 3, text: 'Decentralized identity and verifiable credentials' },
    {
      kind: 'paragraph',
      text: 'Issuer, wallet, and verifier implementations built to the OID4VC family of specifications and ISO 18013-5/-7. This includes credential formats and selective disclosure, trust registries, and the unglamorous interoperability work of making one vendor’s wallet accept another vendor’s credential.',
    },
    { kind: 'heading', level: 3, text: 'Web3 and protocol engineering' },
    {
      kind: 'paragraph',
      text: 'Smart contracts and protocol design in Solidity and Sway, including lending markets and reputation systems, plus the indexers, backends, and dashboards that surround them. I care about the parts that are hard to retrofit: upgrade paths, invariants, and failure behaviour under adversarial conditions.',
    },
    { kind: 'heading', level: 3, text: 'Applied research and product' },
    {
      kind: 'paragraph',
      text: 'Turning research output into products people can run. Much of my work at Blockchain Lab:UM sits in EU-funded projects where the deliverable is a working reference implementation, and the interesting problem is the distance between a specification and a system that survives contact with real users.',
    },
    { kind: 'heading', level: 2, text: 'How I work' },
    {
      kind: 'list',
      items: [
        'End to end. I would rather own a feature from the contract or protocol layer up to the interface than hand it across three teams.',
        'Security-minded by default. Threat modelling and key management are design inputs, not a review gate at the end.',
        'Standards first, then pragmatism. Interoperability is worth real effort; purity for its own sake is not.',
        'Written down. Architecture decisions, trade-offs, and the reasons behind them belong in the repository, not in someone’s memory.',
      ],
    },
    { kind: 'heading', level: 2, text: 'Background' },
    {
      kind: 'paragraph',
      text: `I hold a Master of Science in Computer Science from the [Faculty of Electrical Engineering and Computer Science, University of Maribor](${PERSONAL.universityUrl}), where I also completed my bachelor’s degree. I have been at Blockchain Lab:UM since 2021 and co-founded Lutra Labs in 2024. I work in Slovene and English, and read German.`,
    },
    { kind: 'heading', level: 2, text: 'Elsewhere' },
    {
      kind: 'paragraph',
      text: `Code lives on [GitHub](${PERSONAL.github}). Selected work is written up on the [projects page](/en/projects/), and my full [CV](/cv/) is available as a page and as a PDF. For anything else, see [contact](/en/contact/).`,
    },
  ],
};

export const CONTACT_EN: PageContent = {
  title: 'Contact',
  summary:
    'Email is the reliable channel and reaches me directly. Everything below is a verified account — if an approach claiming to be me arrives anywhere else, treat it with suspicion.',
  blocks: [
    { kind: 'heading', level: 2, text: 'Direct' },
    {
      kind: 'definitions',
      items: [
        {
          term: 'Email',
          description: `[${PERSONAL.email}](mailto:${PERSONAL.email}) — the best way to reach me. I read everything and reply to anything that is clearly addressed to me and not automated outreach.`,
        },
        {
          term: 'PGP',
          description: `My public key is published on [Keybase](${PERSONAL.keybase}), which also carries a signed proof tying that key to this domain. Use it for anything sensitive, including vulnerability reports.`,
        },
      ],
    },
    { kind: 'heading', level: 2, text: 'Profiles' },
    {
      kind: 'definitions',
      items: [
        {
          term: 'GitHub',
          description: `[github.com/pseudobun](${PERSONAL.github}) — code, issues, and pull requests.`,
        },
        {
          term: 'LinkedIn',
          description: `[linkedin.com/in/urbanvidovic](${PERSONAL.linkedin}) — professional background and work history.`,
        },
        {
          term: 'X',
          description: `[@pseudourban](${PERSONAL.twitter}) — occasional notes on identity and Web3.`,
        },
        {
          term: 'Telegram',
          description: `[t.me/pseudobun](${PERSONAL.telegram}) — for people I already work with.`,
        },
        {
          term: 'Farcaster',
          description: `[pseudobun.eth](${PERSONAL.farcaster}) — onchain social.`,
        },
      ],
    },
    { kind: 'heading', level: 2, text: 'What to reach out about' },
    {
      kind: 'list',
      items: [
        'Decentralized identity and verifiable credential work — issuance, wallets, verification, interoperability, or an mDoc/OID4VC integration that is not behaving.',
        'Collaboration on EU-funded or applied research projects that need a working reference implementation rather than a report.',
        'Protocol or smart-contract engagements in the DeFi and reputation space, including reviews of an existing design.',
        'Security disclosures affecting anything I maintain. Use PGP, and expect an acknowledgement before a fix.',
        'Speaking, teaching, or mentoring on identity standards and Web3 engineering.',
      ],
    },
    { kind: 'heading', level: 2, text: 'Please do not' },
    {
      kind: 'list',
      items: [
        'Send unsolicited recruitment or agency outreach that has clearly not read this page.',
        'Pitch token launches, liquidity schemes, or paid promotion. I do not take them.',
        'Ask for backlinks, guest posts, or SEO placements on this site.',
      ],
    },
    { kind: 'heading', level: 2, text: 'Where I am' },
    {
      kind: 'paragraph',
      text: 'Maribor, Slovenia (Central European Time). I work across European time zones and can usually overlap with the US East Coast in my afternoon.',
    },
  ],
};

export const PRIVACY_EN: PageContent = {
  title: 'Privacy',
  summary:
    'This is a personal site. It has no accounts, no login, no comments, no forms, and no advertising. It sets no cookies. The only data collected is aggregate, cookieless traffic measurement.',
  blocks: [
    { kind: 'heading', level: 2, text: 'What is collected' },
    {
      kind: 'paragraph',
      text: 'This site runs [Vercel Web Analytics](https://vercel.com/docs/analytics/privacy-policy) and [Vercel Speed Insights](https://vercel.com/docs/speed-insights/privacy-policy). Both are cookieless and record page views and performance measurements in aggregate. They do not build a cross-site profile of you, do not store an identifier on your device, and do not track you between visits or across other websites.',
    },
    {
      kind: 'paragraph',
      text: 'As with any website, the hosting and CDN layers (Vercel and Cloudflare) process request metadata such as IP address, user agent, and requested URL in order to serve the page and to mitigate abuse. That processing is operational and short-lived; I do not receive or retain those logs as an identifiable dataset.',
    },
    { kind: 'heading', level: 2, text: 'What is not collected' },
    {
      kind: 'list',
      items: [
        'No cookies are set by this site, so there is no cookie banner to dismiss.',
        'There are no user accounts, sign-ups, newsletters, or contact forms — there is nothing here to submit personal data to.',
        'No advertising, no ad networks, no retargeting pixels, no social tracking widgets.',
        'Nothing is sold, rented, or shared with data brokers. There is no data to sell.',
      ],
    },
    { kind: 'heading', level: 2, text: 'Third parties' },
    {
      kind: 'definitions',
      items: [
        {
          term: 'Vercel',
          description:
            'Hosting, serverless functions, and the analytics described above. Acts as processor for request handling.',
        },
        {
          term: 'Cloudflare',
          description:
            'DNS and CDN in front of the site, including transport security and abuse mitigation.',
        },
        {
          term: 'Supabase',
          description:
            'Stores a periodic snapshot of my aggregate public GitHub contribution statistics, which the projects page reads. It contains no visitor data whatsoever.',
        },
        {
          term: 'GitHub',
          description:
            'Queried on a schedule for those public contribution statistics. This happens server-side and is unrelated to your visit.',
        },
      ],
    },
    {
      kind: 'paragraph',
      text: 'Outbound links to GitHub, LinkedIn, X, Telegram, Keybase, and similar services are ordinary links. Once you follow one, that service’s own privacy policy applies and this one no longer does.',
    },
    { kind: 'heading', level: 2, text: 'Embedded and generated content' },
    {
      kind: 'paragraph',
      text: 'Fonts are self-hosted, so no font CDN sees your request. Social preview images and the CV PDF are generated on this domain rather than by a third-party service. Project screenshots are served from this domain or from Supabase storage.',
    },
    { kind: 'heading', level: 2, text: 'Your rights' },
    {
      kind: 'paragraph',
      text: `Under the GDPR you have rights of access, rectification, erasure, restriction, portability, and objection. Because this site holds no personal data that can be linked to you, there is in practice nothing for me to look up, export, or delete. If you believe otherwise, write to [${PERSONAL.email}](mailto:${PERSONAL.email}) and I will investigate and respond.`,
    },
    { kind: 'heading', level: 2, text: 'Changes' },
    {
      kind: 'paragraph',
      text: 'If this policy changes materially, the change will be visible in this page’s history in the public repository that builds this site. There is no mailing list to notify, because there is no mailing list.',
    },
  ],
};
