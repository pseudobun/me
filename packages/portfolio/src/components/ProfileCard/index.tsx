import Image from 'next/image';
import clsx from 'clsx';
import { PERSONAL } from '../../constants/data.mjs';
import SocialIcon from '../Socials';

interface ProfileCardProps {
  className?: string;
}

const animation = 'hover:animate-bounce';

export default function ProfileCard({ className }: ProfileCardProps) {
  return (
    <div className={clsx(className)}>
      <div className="flex flex-col items-center pb-2">
        <Image
          width={256}
          height={256}
          className="mb-3 rounded-full shadow-lg"
          src="/me.JPG"
          alt="Urban's profile picture"
        />
        <h5 className="mb-1 text-center text-3xl font-bold tracking-wider ">
          {PERSONAL.name}
        </h5>
        <span className="flex text-center text-xl">{PERSONAL.position}</span>
        <span className="flex text-xl">
          <a
            href={PERSONAL.companyUrl}
            className="text-cappuccino hover:text-wave"
            target="_blank"
          >
            {' '}
            {PERSONAL.company}
          </a>
        </span>
      </div>
      <div className="mt-2 flex items-center justify-center space-x-4 text-center align-middle">
        <SocialIcon
          className={animation}
          icon="github"
          href={PERSONAL.github}
        />
        <SocialIcon
          className={animation}
          icon="twitter"
          href={PERSONAL.twitter}
        />
        <SocialIcon
          className={animation}
          icon="linkedin"
          href={PERSONAL.linkedin}
        />
        <SocialIcon
          className={animation}
          icon="telegram"
          href={PERSONAL.telegram}
        />
        <SocialIcon className={animation} icon="gmail" href={PERSONAL.email} />
        <SocialIcon
          className={animation}
          icon="farcaster"
          href={PERSONAL.farcaster}
        />
      </div>
    </div>
  );
}
