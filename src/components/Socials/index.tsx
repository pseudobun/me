// https://simpleicons.org/
import Github from "./Icons/github.svg";
import Twitter from "./Icons/twitter.svg";
import LinkedIn from "./Icons/linkedin.svg";
import Mail from "./Icons/gmail.svg";

type ICON_KEYS = "github" | "twitter" | "linkedin" | "gmail";

const Icons: Record<ICON_KEYS, any> = {
  github: Github,
  twitter: Twitter,
  linkedin: LinkedIn,
  gmail: Mail,
};

type SocialIconProps = {
  icon: ICON_KEYS;
  href: string;
};

export default function SocialIcon({ icon, href }: SocialIconProps) {
  const Icon = Icons[icon];
  if (icon == "gmail") {
    href = `mailto:${href}`;
  }

  return (
    <a
      aria-label={`link to ${icon}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className={`h-[32px] w-[32px]`} />
    </a>
  );
}