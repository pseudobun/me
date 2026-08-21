import { Mail } from 'lucide-react';
import { PERSONAL } from '@/constants/data';
import { githubIconSvg, keybaseIconSvg, xIconSvg } from '@/constants/icons';
import { cn } from '@/lib/utils';
import ExoticLink from '../ExoticLink';
import Link from '../Link';

interface FooterProps {
  copyright: string;
  links: { href: string; label: string }[];
}

const socialLinks = [
  { href: PERSONAL.github, icon: githubIconSvg, label: 'GitHub' },
  { href: PERSONAL.keybase, icon: keybaseIconSvg, label: 'Keybase' },
  { href: PERSONAL.twitter, icon: xIconSvg, label: 'X' },
];

export default function Footer({ copyright, links }: FooterProps) {
  return (
    <footer className="w-full relative mt-auto bg-background">
      <div
        aria-hidden="true"
        className="mx-auto h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-border/60 to-transparent"
      />
      <div
        className={cn(
          'flex p-4 px-6 max-md:flex-col gap-x-12 gap-y-4 justify-between items-center',
          'text-muted-foreground fill-muted-foreground',
          'w-full max-w-7xl md:max-w-7xl mx-auto'
        )}
      >
        <div className="flex flex-col items-center gap-2 max-md:order-2 md:items-start">
          <nav
            aria-label="Site information"
            className="flex flex-wrap justify-center gap-x-4 gap-y-1"
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-center text-sm">{copyright}</p>
        </div>
        <nav aria-label="Social links" className="flex space-x-4 max-md:order-1 items-center">
          {socialLinks.map((link) => (
            <ExoticLink key={link.href} href={link.href} ariaLabel={link.label}>
              <span
                className="block w-6 h-6 fill-muted-foreground hover:fill-foreground transition-colors"
                dangerouslySetInnerHTML={{ __html: link.icon }}
              />
            </ExoticLink>
          ))}
          <ExoticLink
            href={`mailto:${PERSONAL.email}`}
            ariaLabel="Email Urban Vidovič"
            blank={false}
          >
            <Mail className="w-6 h-6 text-muted-foreground hover:text-foreground transition-colors" />
          </ExoticLink>
        </nav>
      </div>
    </footer>
  );
}
