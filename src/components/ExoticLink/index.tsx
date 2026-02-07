import clsx from 'clsx';
import Link from 'next/link';

interface ExoticLinkProps {
  href: string;
  className?: string;
  blank?: boolean;
  children?: React.ReactNode;
  rel?: string;
  noEnlarge?: boolean;
}

export default function ExoticLink({ href, className, children }: ExoticLinkProps) {
  return (
    <Link
      aria-label={`link to ${href}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(className, 'text-cappuccino hover:text-wave')}
    >
      {children}
    </Link>
  );
}
