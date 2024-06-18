import clsx from 'clsx';
import Link from 'next/link';

interface ExoticLinkProps {
  href: string;
  destination: string;
  className?: string;
}

export default function ExoticLink({
  href,
  destination,
  className,
}: ExoticLinkProps) {
  return (
    <Link
      aria-label={`link to ${destination}`}
      href={href}
      className={clsx(className)}
    >
      {destination}
    </Link>
  );
}
