import DecryptedText from '@/components/DecryptedText';
import ExoticLink from '@/components/ExoticLink';
import { PERSONAL } from '@/constants/data.mjs';

export default function About() {
  return (
    <div className="flex flex-col w-full md:max-w-[512px] max-w-[256px] items-start">
      <span className="text-2xl font-bold">gm 🌱</span>
      <p className="text-lg">
        I'm Urban, a Software Engineer from Maribor, Slovenia. I currently work
        at{' '}
        <ExoticLink
          aria-label="Go to company website"
          className="no-underline"
          href={PERSONAL.companyUrl}
        >
          <DecryptedText sequential={true} text={PERSONAL.company} animateOn="both"  speed={60} />
        </ExoticLink>{' '}
        and{' '}
        <ExoticLink
          aria-label="Go to company website"
          blank
          className="no-underline"
          href={PERSONAL.company2Url}
        >
          <DecryptedText sequential={true} text={PERSONAL.company2} animateOn="both" speed={60} />
        </ExoticLink>{' '}
        as a {PERSONAL.position}. I have a Master's degree in Computer Science
        acquired at{' '}
        <ExoticLink
          blank
          className="no-underline"
          href={PERSONAL.universityUrl}
        >
          <DecryptedText sequential={true}
            text="Faculty of Electrical Engineering and Computer Science, University of Maribor."
            animateOn="both"
            speed={30}
            revealDirection="start"
          />
        </ExoticLink>
      </p>
    </div>
  );
}
