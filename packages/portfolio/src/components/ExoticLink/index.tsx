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

export default function ExoticLink({
  href,
  className,
  blank,
  children,
  rel,
  noEnlarge,
}: ExoticLinkProps) {
  return (
    <Link
      aria-label={`link to ${href}`}
      href={href}
      target="_blank"
      rel={blank ? 'noopener noreferrer' : rel}
      className={clsx(
        className,
        'text-cappuccino hover:text-wave hover:font-bold hover:opacity-80 active:opacity-50',
        blank ? 'underline' : '',
      )}
    >
      {children}
    </Link>
  );
}
