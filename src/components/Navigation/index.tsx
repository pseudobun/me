'use client';

import { Link as LinkIcon, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from '@/components/Link';
import type { MenuInput } from '@/config/menu';
import { locales, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface NavigationProps {
  lang: Locale;
  menus: MenuInput[];
  openMenuLabel: string;
}

export default function Navigation({ lang, menus, openMenuLabel }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const getSwitchUrl = (newLang: Locale): string => {
    const prefix = `/${lang}`;
    const rest = pathname.startsWith(prefix) ? pathname.slice(prefix.length) || '/' : '/';
    return `/${newLang}${rest}`;
  };

  return (
    <nav
      className={cn(
        'fixed top-4 z-50 transition-all duration-300 ease-in-out',
        'backdrop-blur-xl bg-background/30 border border-border/40 rounded-2xl shadow-lg',
        menuOpen ? 'shadow-xl overflow-hidden' : '',
        'w-[calc(100%-3rem)] max-w-7xl left-1/2 -translate-x-1/2'
      )}
    >
      <div className="px-4 w-full">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${lang}/`} className="flex items-center">
              <Image src="/dark-logo.svg" width={32} height={410} alt="Bunnys Den Logo" priority />
            </Link>
            <div className="pl-2 flex flex-col leading-tight font-mono text-muted-foreground">
              <span>Bunny's</span>
              <span>Den</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex hover:cursor-pointer items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">{openMenuLabel}</span>
              {menuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation - centered */}
          <div className="hidden md:block md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <div className="flex gap-x-12">
              {menus.map((menu: MenuInput) => (
                <Link key={menu.label} href={menu.href} isExternal={menu.external}>
                  {menu.label}
                  {menu.external ? <LinkIcon className="w-3 h-3 ml-1" /> : null}
                </Link>
              ))}
            </div>
          </div>

          {/* Language switcher */}
          <div className="flex items-center gap-x-1 font-mono text-sm text-muted-foreground">
            {locales.map((locale, i) => (
              <span key={locale} className="flex items-center gap-x-1">
                {i > 0 && <span className="select-none">/</span>}
                {locale === lang ? (
                  <span className="text-foreground font-semibold uppercase">{locale}</span>
                ) : (
                  <Link
                    href={getSwitchUrl(locale)}
                    className="uppercase hover:text-foreground transition-colors"
                  >
                    {locale}
                  </Link>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {menus.map((menu: MenuInput) => (
            <Link
              key={menu.label}
              href={menu.href}
              isExternal={menu.external ? true : undefined}
              onClick={handleLinkClick}
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 transition-colors"
            >
              {menu.label}
              {menu.external ? <LinkIcon className="w-3 h-3 ml-1" /> : null}
            </Link>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div
          role="presentation"
          className="fixed inset-0 bg-background/50 backdrop-blur-xs z-[-1]"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
}
