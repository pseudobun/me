'use client';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export default function Link({
  href,
  isExternal,
  ...props
}: { href: string; [key: string]: any }) {
  const pathname = usePathname();
  const isActive = href === pathname;
  return (
    <NavigationMenuLink asChild active={isActive}>
      <NextLink
        href={href}
        target={isExternal ? '_blank' : undefined}
        className={cn(
          'hover:text-cappuccino flex gap-2 items-center',
          isActive ? 'underline text-cappuccino' : '',
        )}
        {...props}
      />
    </NavigationMenuLink>
  );
}
