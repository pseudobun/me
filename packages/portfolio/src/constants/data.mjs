import masca from '../project-screenshots/masca.png';
import eductxv2 from '../project-screenshots/eductxv2.png';
import eductxv1 from '../project-screenshots/eductxv1.png';
import moodleEductx from '../project-screenshots/moodle-eductx.png';
import solo from '../project-screenshots/solo.png';

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
  hey: 'https://hey.xyz/u/pseudobun',
  position: 'Research & Development Engineer',
};

export const PROJECTS = [
  // {
  //   title: 'EES - Ethereum Endorsement Service',
  //   description:
  //     'Make on-chain endorsements, see social graphs, build reputation and more.',
  //   website: 'https://endorse.fun',
  //   github: 'https://github.com/lutralabs/ees',
  //   image: masca,
  // },
  {
    title: 'Masca',
    description:
      'A MetaMask snap, bringing decentralized identity capabilites to the MetaMask wallet.',
    website: 'https://masca.io',
    github: 'https://github.com/blockchain-lab-um/masca',
    image: masca,
    org: 'Lutra Labs',
    orgUrl: 'https://lutralabs.io',
  },
  {
    title: 'EduCTX V2',
    description:
      'Issue and receive educational Verifiable Credentials conforming to the latest W3C decentralized identity standards.',
    website: 'https://platform2.eductx.org',
    // github: 'https://github.com/blockchain-lab-um/issuer-platform-EduCTX',
    image: eductxv2,
    org: 'Blockchain Lab:UM',
    orgUrl: 'https://blockchain-lab.um.si/?lang=en',
  },
  {
    title: 'EduCTX V1',
    description:
      'Issue and receive on-chain verifiable educational microcertificates.',
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
