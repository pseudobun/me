'use client';

import NextLink, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = LinkProps &
  Omit<ComponentPropsWithoutRef<typeof NextLink>, 'href'> & {
    children: ReactNode;
    isExternal?: boolean;
  };

function normalizePath(path: string) {
  if (path === '/') {
    return '/';
  }

  return path.endsWith('/') ? path : `${path}/`;
}

export default function Link({ children, className, href, isExternal = false, ...props }: Props) {
  const pathname = usePathname();
  const hrefString = typeof href === 'string' ? href : href.toString();
  const isActive = !isExternal && normalizePath(pathname) === normalizePath(hrefString);

  return (
    <NextLink
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-current={isActive ? 'page' : undefined}
      prefetch={isExternal ? false : props.prefetch}
      className={cn(
        'hover:text-primary text-foreground text-left flex items-center gap-2',
        isActive ? 'underline text-primary' : '',
        className
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}
