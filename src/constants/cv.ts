// Single source of truth for the CV page (HTML) and the generated PDF
// (src/app/api/cv/route.ts). Keep prose here so both stay in sync.

export const CV_TITLE = 'Research & Development Engineer';
export const CV_LOCATION = 'Maribor, Slovenia';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

function parsePoint(raw: string, now: Date): { y: number; m: number } | null {
  const s = raw.trim();
  if (/present/i.test(s)) {
    return { y: now.getFullYear(), m: now.getMonth() };
  }
  const withMonth = s.match(/^([A-Za-z]{3})[a-z]*\s+(\d{4})$/);
  if (withMonth) {
    const mi = MONTHS.indexOf(withMonth[1].toLowerCase());
    if (mi >= 0) {
      return { y: Number(withMonth[2]), m: mi };
    }
  }
  const yearOnly = s.match(/^(\d{4})$/);
  if (yearOnly) {
    return { y: Number(yearOnly[1]), m: 0 };
  }
  return null;
}

// "Oct 2024 – Present" -> "1 yr 9 mos" (inclusive, LinkedIn-style). Returns
// null when the period can't be parsed.
export function periodDuration(period: string, now: Date = new Date()): string | null {
  const [a, b] = period.split(/[–-]/).map((part) => part.trim());
  const start = parsePoint(a ?? '', now);
  const end = parsePoint(b ?? '', now);
  if (!start || !end) {
    return null;
  }
  const months = (end.y - start.y) * 12 + (end.m - start.m) + 1;
  if (months <= 0) {
    return null;
  }
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  }
  if (rem > 0) {
    parts.push(`${rem} mo${rem > 1 ? 's' : ''}`);
  }
  return parts.join(' ') || '1 mo';
}

export const CV_PGP_URL =
  'https://raw.githubusercontent.com/pseudobun/dotfiles/main/bunnys-cloud-pgp-key.asc';

export const CV_SUMMARY =
  'Software engineer focused on decentralized identity, verifiable credentials, and ' +
  'Web3 product engineering, with a security-minded approach to systems and infrastructure. ' +
  'COO & co-founder of Lutra Labs and Research & Development Engineer at Blockchain Lab:UM, where I ' +
  'build standards-based identity platforms, DeFi protocols, and developer tooling end to end — ' +
  'from smart contracts and backends to dashboards and native apps.';

export interface CvExperience {
  role: string;
  org: string;
  orgUrl?: string;
  period: string;
  location: string;
  points: string[];
}

export const CV_EXPERIENCE: CvExperience[] = [
  {
    role: 'COO & Co-Founder',
    org: 'Lutra Labs',
    orgUrl: 'https://lutralabs.io',
    period: 'Oct 2024 – Present',
    location: 'Maribor, Slovenia',
    points: [
      'Co-founded Lutra Labs and lead operations alongside hands-on engineering across the product stack.',
      'Ship products end to end: LutraID (OID4VCI / mDoc digital identity), Swaylend (lending protocol on Fuel, written in Sway), Replicant Network, and endorse.fun.',
      'Own delivery from smart contracts and Rust/Node backends to Next.js dashboards and internal tooling.',
    ],
  },
  {
    role: 'Research & Development Engineer',
    org: 'Blockchain Lab:UM',
    orgUrl: 'https://blockchain-lab.um.si/?lang=en',
    period: 'May 2021 – Present',
    location: 'Maribor, Slovenia',
    points: [
      'Build decentralized identity and verifiable credential systems aligned with the latest W3C standards (EduCTX, Masca MetaMask Snap).',
      'Design and ship EVM smart contracts, Web3 infrastructure, and backends, plus the web and Moodle integrations on top of them.',
      'Drive applied R&D across identity, credentials, and security from prototype to production.',
    ],
  },
  {
    role: 'Full Stack Engineer',
    org: 'Blocksi SaS',
    period: 'Oct 2020 – Apr 2021',
    location: 'Maribor, Slovenia',
    points: [
      'C++ Windows service blocking DNS requests at the kernel level.',
      'Node.js backend (HTTP API + sockets) for a teacher dashboard: screen sharing, remote tab control, site allow/block lists.',
      'React, Vue, and Python Flask frontends, plus a Flutter (iOS/Android) app for managing students and network access.',
    ],
  },
  {
    role: 'Backend Engineer',
    org: 'H-Bit d.o.o. (NiceHash)',
    period: 'Aug 2019 – Sep 2020',
    location: 'Maribor, Slovenia',
    points: [
      'C/C++ backends for mining pools, rig communication, and pool/algorithm validators.',
      'iOS app for managing mining rigs, exchange, and the hashpower marketplace.',
    ],
  },
  {
    role: 'IT Technician',
    org: 'Simtel d.o.o.',
    period: 'Nov 2018 – Jan 2019',
    location: 'Maribor, Slovenia',
    points: ['Managed and installed internet and television hardware.'],
  },
];

export interface CvEducation {
  degree: string;
  school: string;
  schoolUrl?: string;
  period: string;
}

export const CV_EDUCATION: CvEducation[] = [
  {
    degree: 'Master of Science in Computer Science',
    school: 'Faculty of Electrical Engineering and Computer Science, University of Maribor',
    schoolUrl: 'https://feri.um.si/en/',
    period: 'Oct 2020 – 2023',
  },
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'Faculty of Electrical Engineering and Computer Science, University of Maribor',
    schoolUrl: 'https://feri.um.si/en/',
    period: 'Oct 2017 – Sep 2020',
  },
  {
    degree: 'High school graduate',
    school: 'Prva Gimnazija Maribor',
    period: 'Sep 2013 – May 2017',
  },
];

export const CV_SKILLS: { label: string; items: string[] }[] = [
  {
    label: 'Languages & runtimes',
    items: ['TypeScript / Node.js', 'Rust', 'Solidity / Sway', 'Swift', 'C / C++', 'Go', 'Python'],
  },
  {
    label: 'Frameworks & tools',
    items: ['Next.js / React', 'Vue', 'Flutter', 'Foundry / Hardhat', 'Git'],
  },
  {
    label: 'Domains',
    items: [
      'Decentralized identity',
      'Verifiable credentials',
      'DeFi',
      'Web3 infrastructure',
      'Security',
      'Native iOS / macOS',
    ],
  },
];

export const CV_LANGUAGES: { name: string; level: string }[] = [
  { name: 'Slovene', level: 'Native' },
  { name: 'English', level: 'Advanced / C2' },
  { name: 'German', level: 'Intermediate / B1' },
];

export interface CvProject {
  id: string;
  title: string;
  org: string;
  url?: string;
  description: string;
}

// Projects featured on the CV (short blurbs), in display order. Decoupled from
// data.mjs so the CV stays concise; full project copy lives on /projects.
export const CV_PROJECTS: CvProject[] = [
  {
    id: 'lutra-id',
    title: 'LutraID',
    org: 'Lutra Labs',
    url: 'https://id.lutralabs.io',
    description: 'Compliant platform for issuing and verifying digital documents (OID4VCI, mDoc).',
  },
  {
    id: 'swaylend',
    title: 'Swaylend',
    org: 'Lutra Labs',
    url: 'https://swaylend.com',
    description: 'The leading lending protocol on Fuel Network, written in Sway.',
  },
  {
    id: 'masca',
    title: 'Masca',
    org: 'Blockchain Lab:UM',
    url: 'https://masca.io',
    description: 'MetaMask Snap bringing decentralized identity (DIDs, VCs) to the wallet.',
  },
  {
    id: 'replicant-network',
    title: 'Replicant Network',
    org: 'Lutra Labs',
    url: 'https://rplcnt.io',
    description: 'Decentralized platform for AI model crowdfunding, development, and deployment.',
  },
  {
    id: 'endorse-fun',
    title: 'endorse.fun',
    org: 'Lutra Labs',
    url: 'https://endorse.fun',
    description: 'Endorse creators and builders onchain via ENS, Farcaster, or Lens.',
  },
  {
    id: 'eductx-v2',
    title: 'EduCTX',
    org: 'Blockchain Lab:UM',
    url: 'https://platform2.eductx.org',
    description: 'Issue and receive educational verifiable credentials on W3C standards.',
  },
  {
    id: 'polycat',
    title: 'polycat',
    org: 'Personal',
    description: 'Cross-platform Kalshi ↔ Polymarket arbitrage bot with a Rust runtime and TUI.',
  },
  {
    id: 'tossinger',
    title: 'Tossinger',
    org: 'Personal',
    url: 'https://apps.apple.com/si/app/tossinger/id6754607504',
    description: 'Native iOS/macOS app to quickly save content into a personal collection.',
  },
];
