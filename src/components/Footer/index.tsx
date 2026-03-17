import { Mail } from 'lucide-react';
import { siGithub, siKeybase, siX } from 'simple-icons';
import { PERSONAL } from '@/constants/data.mjs';
import { cn } from '@/lib/utils';
import ExoticLink from '../ExoticLink';

interface FooterProps {
  copyright: string;
}

const socialLinks = [
  { href: PERSONAL.github, icon: siGithub.svg.replace(/<title>.*?<\/title>/, ''), label: 'GitHub' },
  {
    href: PERSONAL.keybase,
    icon: siKeybase.svg.replace(/<title>.*?<\/title>/, ''),
    label: 'Keybase',
  },
  { href: PERSONAL.twitter, icon: siX.svg.replace(/<title>.*?<\/title>/, ''), label: 'X' },
];

export default function Footer({ copyright }: FooterProps) {
  return (
    <footer className="w-full relative mt-auto bg-background border-t border-border/60">
      <div
        className={cn(
          'flex p-4 px-6 max-md:flex-col gap-x-12 gap-y-4 justify-between items-center',
          'text-muted-foreground fill-muted-foreground',
          'w-full max-w-7xl md:max-w-7xl mx-auto'
        )}
      >
        <p className="text-center max-md:order-2">{copyright}</p>
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
