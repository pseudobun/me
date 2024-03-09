// https://simpleicons.org/
import clsx from 'clsx';
import Farcaster from '../Icons/farcaster.svg';
import Github from '../Icons/github.svg';
import Mail from '../Icons/gmail.svg';
import LinkedIn from '../Icons/linkedin.svg';
import Telegram from '../Icons/telegram.svg';
import Twitter from '../Icons/twitter.svg';

type IconKeys =
  | 'github'
  | 'twitter'
  | 'linkedin'
  | 'gmail'
  | 'telegram'
  | 'farcaster';

const Icons: Record<IconKeys, any> = {
  github: Github,
  twitter: Twitter,
  linkedin: LinkedIn,
  gmail: Mail,
  telegram: Telegram,
  farcaster: Farcaster,
};

interface SocialIconProps {
  className?: string;
  icon: IconKeys;
  href: string;
}

export default function SocialIcon({ className, icon, href }: SocialIconProps) {
  const Icon = Icons[icon];
  if (icon === 'gmail') {
    href = `mailto:${href}`;
  }

  return (
    <a
      aria-label={`link to ${icon}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(className)}
    >
      <Icon className={'h-[32px] w-[32px]'} />
    </a>
  );
}
