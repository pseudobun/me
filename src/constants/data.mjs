import chilitrack from '@/project-screenshots/chilitrack.png';
import coworkmaribor from '@/project-screenshots/cwmb-booking.png';
import eductxv1 from '@/project-screenshots/eductxv1.png';
import eductxv2 from '@/project-screenshots/eductxv2.png';
import endorsedotfun from '@/project-screenshots/endorsedotfun.png';
import lutraId from '@/project-screenshots/lutra-id.png';
import lutradashboard from '@/project-screenshots/lutradashboard.png';
import masca from '@/project-screenshots/masca.png';
import moodleEductx from '@/project-screenshots/moodle-eductx.png';
import polycat from '@/project-screenshots/polycat.png';
import repnet from '@/project-screenshots/repnet.png';
import solo from '@/project-screenshots/solo.png';
import swaylend from '@/project-screenshots/swaylend.png';
import tossinger from '@/project-screenshots/tossinger.png';

export const PERSONAL = {
  name: 'Urban',
  lastName: 'Vidovič',
  fullName: 'Urban Vidovič',
  email: 'urban@bunnys.cloud',
  linkedin: 'https://www.linkedin.com/in/urbanvidovic',
  telegram: 'https://t.me/pseudobun',
  farcaster: 'https://warpcast.com/pseudobun.eth',
  github: 'https://github.com/pseudobun',
  twitter: 'https://twitter.com/pseudourban',
  company: 'Blockchain Lab:UM',
  companyUrl: 'https://blockchain-lab.um.si/?lang=en',
  company2: 'Lutra Labs',
  company2Url: 'https://lutralabs.io',
  keybase: 'https://keybase.io/pseudobun',
  hey: 'https://hey.xyz/u/pseudobun',
  position: 'Research & Development Engineer',
  universityUrl: 'https://feri.um.si/en/',
};

export const PROJECTS = [
  {
    id: 'polyarb',
    title: 'Polyarb',
    description:
      'Polyarb is a private monorepo for a Polymarket weather bot and realtime dashboard. It combines Rust strategy runtimes, a peripheral API, and a Next.js interface for monitoring markets, orders, balances, analytics, and weather overlays.',
    githubRepo: 'pseudobun/polycat',
    image: polycat,
    highlight: false,
    org: 'Personal',
    orgUrl: 'https://pseudobun.dev',
    tags: ['Polymarket', 'Rust', 'Next.js', 'Trading bot'],
  },
  {
    id: 'lutra-id',
    title: 'LutraID',
    description:
      'LutraID is a compliant platform for issuing and verifying digital documents. It brings together issuer and verifier workflows, wallet-facing credential issuance, and standards-based verification flows for modern digital identity systems.',
    githubRepo: 'lutralabs/lutra-doc',
    website: 'https://id.lutralabs.io',
    image: lutraId,
    highlight: false,
    org: 'Lutra Labs',
    orgUrl: 'https://lutralabs.io',
    tags: ['Digital identity', 'OID4VCI', 'Verification', 'mDoc'],
  },
  {
    id: 'tossinger',
    title: 'Tossinger',
    description:
      "Tossinger is a native iOS and macOS app that lets you quickly 'toss' content from anywhere - tweets, web pages, articles, links - into your personal collection to revisit and organize later on your preferred device.",
    appStore: 'https://apps.apple.com/si/app/tossinger/id6754607504',
    github: 'https://github.com/pseudobun/tossinger',
    githubRepo: 'pseudobun/tossinger',
    image: tossinger,
    highlight: false,
    org: 'Personal',
    orgUrl: 'https://pseudobun.dev',
    tags: ['iOS', 'macOS', 'Native app'],
  },
  {
    id: 'replicant-network',
    title: 'Replicant Network',
    description: 'A decentralized platform for AI model crowdfunding, development, and deployment.',
    website: 'https://rplcnt.io',
    github: 'https://github.com/lutralabs/replicant-network-monorepo',
    githubRepo: 'lutralabs/replicant-network-monorepo',
    image: repnet,
    highlight: false,
    org: 'Lutra Labs',
    orgUrl: 'https://lutralabs.io',
    tags: ['AI', 'Decentralized', 'Crowdfunding'],
  },
  {
    id: 'swaylend',
    title: 'Swaylend',
    description:
      'The first and leading lending protocol on Fuel Network. Utilizing FuelVM, written in Sway. Earn as you supply the base asset or supply collateral and borrow the base asset yourself.',
    website: 'https://swaylend.com',
    github: 'https://github.com/swaylend/swaylend-monorepo',
    githubRepo: 'swaylend/swaylend-monorepo',
    image: swaylend,
    highlight: false,
    org: 'Lutra Labs',
    orgUrl: 'https://lutralabs.io',
    tags: ['DeFi', 'FuelVM', 'Sway'],
  },
  {
    id: 'lutra-dashboard',
    title: 'Lutra Labs Internal Dashboard',
    description:
      'Lutra Labs dashboard for managing attendances, events, and more. Why use existing solutions when you can build your own?',
    image: lutradashboard,
    highlight: false,
    org: 'Lutra Labs',
    orgUrl: 'https://lutralabs.io',
    tags: ['Internal tooling', 'Operations', 'Productivity'],
  },
  {
    id: 'chilitrack',
    title: 'ChiliTrack',
    description:
      "A chili plant growth monitoring app that captures images on a schedule, analyzes them with AI, and presents a timeline view of the plant's development. Features live streaming, daily AI-generated growth commentary, and weekly comparative analysis.",
    image: chilitrack,
    highlight: false,
    org: 'Personal',
    orgUrl: 'https://pseudobun.dev',
    tags: ['AI', 'IoT', 'Next.js', 'Python'],
  },
  {
    id: 'cowork-maribor',
    title: 'Cowork Maribor Booking System',
    description: 'Book a desk at Cowork Maribor. Custom product for a local coworking space.',
    website: 'https://booking.coworkmaribor.com',
    image: coworkmaribor,
    highlight: false,
    org: 'Lutra Labs',
    orgUrl: 'https://lutralabs.io',
    tags: ['Booking', 'Local business', 'Custom software'],
  },
  {
    id: 'endorse-fun',
    title: 'endorse.fun',
    description:
      "Endorse your favorite creators, builders, hackers and various other types of Web3 participants onchain. Whether they're known via ENS, Farcaster, or Lens, show your appreciation and help build a stronger community.",
    website: 'https://endorse.fun',
    github: 'https://github.com/lutralabs/ees',
    githubRepo: 'lutralabs/ees',
    image: endorsedotfun,
    highlight: false,
    org: 'Lutra Labs',
    orgUrl: 'https://lutralabs.io',
    tags: ['Social', 'Onchain', 'Creator economy'],
  },
  {
    id: 'masca',
    title: 'Masca',
    description:
      'A MetaMask snap, bringing decentralized identity capabilites to the MetaMask wallet. Manage your DIDs and VCs, choose where to store received credentials, and share customized VPs.',
    website: 'https://masca.io',
    github: 'https://github.com/blockchain-lab-um/masca',
    githubRepo: 'blockchain-lab-um/masca',
    image: masca,
    org: 'Lutra Labs',
    orgUrl: 'https://lutralabs.io',
    tags: ['Decentralized identity', 'MetaMask Snap', 'Verifiable credentials'],
  },
  {
    id: 'eductx-v2',
    title: 'EduCTX V2',
    description:
      'Issue and receive educational Verifiable Credentials conforming to the latest W3C decentralized identity standards, and store them in Masca.',
    website: 'https://platform2.eductx.org',
    githubRepo: 'blockchain-lab-um/issuer-platform-EduCTX',
    image: eductxv2,
    org: 'Blockchain Lab:UM',
    orgUrl: 'https://blockchain-lab.um.si/?lang=en',
    tags: ['Education', 'W3C VC', 'Decentralized identity'],
  },
  {
    id: 'eductx-v1',
    title: 'EduCTX V1',
    description:
      'Issue and receive on-chain verifiable educational microcertificates on consortium EduCTX EVM network. Your certificates are verifiable, encrypted, and stored on-chain.',
    website: 'https://platform2.eductx.org',
    github: 'https://github.com/blockchain-lab-um/issuer',
    githubRepo: 'blockchain-lab-um/issuer',
    image: eductxv1,
    org: 'Blockchain Lab:UM',
    orgUrl: 'https://blockchain-lab.um.si/?lang=en',
    tags: ['Education', 'Onchain credentials', 'EVM'],
  },
  {
    id: 'eductx-moodle',
    title: 'EduCTX plugin for Moodle',
    description:
      "Utilize EduCTX's (EduCTXv1 and EduCTXv2) decentralized identity capabilities in Moodle.",
    github: 'https://github.com/blockchain-lab-um/moodle-eductx-plugin',
    githubRepo: 'blockchain-lab-um/moodle-eductx-plugin',
    image: moodleEductx,
    org: 'Blockchain Lab:UM',
    orgUrl: 'https://blockchain-lab.um.si/?lang=en',
    tags: ['Moodle', 'Education', 'Plugin'],
  },
  {
    id: 'university-projects',
    title: 'University projects',
    description:
      "Projects I've worked on while I studied at the Faculty of Electrical Engineering and Computer Science at the University of Maribor.",
    org: 'University of Maribor',
    orgUrl: 'https://www.um.si/en',
    image: solo,
    github: 'https://github.com/pseudobun/solo-projects',
    githubRepo: 'pseudobun/solo-projects',
    tags: ['Research', 'University', 'Software engineering'],
  },
];
