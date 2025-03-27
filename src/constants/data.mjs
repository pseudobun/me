import masca from '@/project-screenshots/masca.png';
import eductxv2 from '@/project-screenshots/eductxv2.png';
import eductxv1 from '@/project-screenshots/eductxv1.png';
import moodleEductx from '@/project-screenshots/moodle-eductx.png';
import solo from '@/project-screenshots/solo.png';
import endorsedotfun from '@/project-screenshots/endorsedotfun.png';
import swaylend from '@/project-screenshots/swaylend.png';
import repnet from '@/project-screenshots/repnet.png';
import lutradashboard from '@/project-screenshots/lutradashboard.png';

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
    title: 'Replicant Network',
    description:
      'A decentralized platform for AI model crowdfunding, development, and deployment.',
    website: 'https://rplcnt.io',
    github: 'https://github.com/lutralabs/replicant-network-monorepo',
    image: repnet,
    highlight: false,
    org: 'Lutra Labs',
    orgUrl: 'https://lutralabs.io',
  },
  {
    title: 'Swaylend',
    description:
      'The first and leading lending protocol on Fuel Network. Utilizing FuelVM, written in Sway. Earn as you supply the base asset or supply collateral and borrow the base asset yourself.',
    website: 'https://swaylend.com',
    github: 'https://github.com/swaylend/swaylend-monorepo',
    image: swaylend,
    highlight: false,
    org: 'Lutra Labs',
    orgUrl: 'https://lutralabs.io',
  },
  {
    title: 'Lutra Labs Internal Dashboard',
    description:
      'Lutra Labs dashboard for managing attendances, events, and more. Why use existing solutions when you can build your own?',
    image: lutradashboard,
    highlight: false,
    org: 'Lutra Labs',
    orgUrl: 'https://lutralabs.io',
  },
  {
    title: 'endorse.fun',
    description:
      "Endorse your favorite creators, builders, hackers and various other types of Web3 participants onchain. Whether they're known via ENS, Farcaster, or Lens, show your appreciation and help build a stronger community.",
    website: 'https://endorse.fun',
    github: 'https://github.com/lutralabs/ees',
    image: endorsedotfun,
    highlight: false,
    org: 'Lutra Labs',
    orgUrl: 'https://lutralabs.io',
  },
  {
    title: 'Masca',
    description:
      'A MetaMask snap, bringing decentralized identity capabilites to the MetaMask wallet. Manage your DIDs and VCs, choose where to store received credentials, and share customized VPs.',
    website: 'https://masca.io',
    github: 'https://github.com/blockchain-lab-um/masca',
    image: masca,
    org: 'Lutra Labs',
    orgUrl: 'https://lutralabs.io',
  },
  {
    title: 'EduCTX V2',
    description:
      'Issue and receive educational Verifiable Credentials conforming to the latest W3C decentralized identity standards, and store them in Masca.',
    website: 'https://platform2.eductx.org',
    // github: 'https://github.com/blockchain-lab-um/issuer-platform-EduCTX',
    image: eductxv2,
    org: 'Blockchain Lab:UM',
    orgUrl: 'https://blockchain-lab.um.si/?lang=en',
  },
  {
    title: 'EduCTX V1',
    description:
      'Issue and receive on-chain verifiable educational microcertificates on consortium EduCTX EVM network. Your certificates are verifiable, encrypted, and stored on-chain.',
    website: 'https://platform2.eductx.org',
    github: 'https://github.com/blockchain-lab-um/issuer',
    image: eductxv1,
    org: 'Blockchain Lab:UM',
    orgUrl: 'https://blockchain-lab.um.si/?lang=en',
  },
  {
    title: 'EduCTX plugin for Moodle',
    description:
      "Utilize EduCTX's (EduCTXv1 and EduCTXv2) decentralized identity capabilities in Moodle.",
    github: 'https://github.com/blockchain-lab-um/moodle-eductx-plugin',
    image: moodleEductx,
    org: 'Blockchain Lab:UM',
    orgUrl: 'https://blockchain-lab.um.si/?lang=en',
  },
  {
    title: 'University projects',
    description:
      "Projects I've worked on while I studied at the Faculty of Electrical Engineering and Computer Science at the University of Maribor.",
    org: 'University of Maribor',
    orgUrl: 'https://www.um.si/en',
    image: solo,
    github: 'https://github.com/pseudobun/solo-projects',
  },
];
