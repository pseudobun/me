'use client';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';

export default function Link({
  href,
  isExternal,
  ...props
}: { href: string; [key: string]: any }) {
  const pathname = usePathname();
  const isActive = href === pathname;
  return (
    <NextLink
      href={href}
      target={isExternal ? '_blank' : undefined}
      className={cn(
        'hover:text-primary text-foreground text-left flex items-center gap-2',
        isActive ? 'underline text-primary' : '',
      )}
      {...props}
    />
  );
}
