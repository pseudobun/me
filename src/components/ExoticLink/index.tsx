import clsx from 'clsx';
import type { ReactNode } from 'react';

interface ExoticLinkProps {
  ariaLabel?: string;
  blank?: boolean;
  children?: ReactNode;
  className?: string;
  href: string;
  rel?: string;
}

export default function ExoticLink({
  ariaLabel,
  blank = true,
  children,
  className,
  href,
  rel,
}: ExoticLinkProps) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');

  return (
    <a
      aria-label={ariaLabel ?? `link to ${href}`}
      href={href}
      target={blank && isExternal ? '_blank' : undefined}
      rel={blank && isExternal ? (rel ?? 'noopener noreferrer') : rel}
      className={clsx(className, 'text-cappuccino hover:text-wave')}
    >
      {children}
    </a>
  );
}
