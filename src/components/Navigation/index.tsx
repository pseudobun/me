'use client';

import { Link as LinkIcon, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from '@/components/Link';
import type { MenuInput } from '@/config/menu';
import { type Locale, locales } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface NavigationProps {
  lang: Locale;
  menus: MenuInput[];
  openMenuLabel: string;
  externalHint: string;
}

function LocaleSwitcher({
  lang,
  getSwitchUrl,
  className,
  onLinkClick,
}: {
  lang: Locale;
  getSwitchUrl: (newLang: Locale) => string;
  className?: string;
  onLinkClick?: () => void;
}) {
  return (
    <div
      role="group"
      aria-label="Language switcher"
      className={cn('flex items-center gap-x-1 font-mono text-sm text-muted-foreground', className)}
    >
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-x-1">
          {i > 0 && <span className="select-none">/</span>}
          {locale === lang ? (
            <span className="text-foreground font-semibold uppercase">{locale}</span>
          ) : (
            <Link
              href={getSwitchUrl(locale)}
              onClick={onLinkClick}
              className="uppercase hover:text-foreground transition-colors"
            >
              {locale}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}

export default function Navigation({ lang, menus, openMenuLabel, externalHint }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Flush + chrome-less at the very top; detaches into a floating pill on scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const getSwitchUrl = (newLang: Locale): string => {
    const prefix = `/${lang}`;
    const rest = pathname.startsWith(prefix) ? pathname.slice(prefix.length) || '/' : '/';
    return `/${newLang}${rest}`;
  };

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        'fixed z-50 inset-x-0 mx-auto w-[calc(100%-3rem)] max-w-7xl transition-all duration-300 ease-in-out',
        'motion-safe:animate-[nav-enter_0.45s_ease-out_both]',
        scrolled || menuOpen
          ? 'top-4 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-background/30 to-primary/[0.04] border border-border/40 shadow-lg'
          : 'top-0 rounded-none border border-transparent bg-transparent shadow-none backdrop-blur-none',
        menuOpen ? 'shadow-xl overflow-hidden' : ''
      )}
    >
      <div className="px-4 w-full">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${lang}/`} className="flex items-center">
              <Image src="/dark-logo.svg" width={32} height={42} alt="Bunny's Den logo" priority />
            </Link>
            <div className="pl-2 flex flex-col leading-tight font-mono text-muted-foreground">
              <span>Bunny's</span>
              <span>Den</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex hover:cursor-pointer items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                <Link
                  key={menu.label}
                  href={menu.href}
                  isExternal={menu.external}
                  aria-label={menu.external ? `${menu.label} (${externalHint})` : undefined}
                >
                  {menu.label}
                  {menu.external ? <LinkIcon className="w-3 h-3 ml-1" /> : null}
                </Link>
              ))}
            </div>
          </div>

          {/* Language switcher - desktop only */}
          <LocaleSwitcher lang={lang} getSwitchUrl={getSwitchUrl} className="hidden md:flex" />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {menus.map((menu: MenuInput) => (
            <Link
              key={menu.label}
              href={menu.href}
              isExternal={menu.external ? true : undefined}
              aria-label={menu.external ? `${menu.label} (${externalHint})` : undefined}
              onClick={handleLinkClick}
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 transition-colors"
            >
              {menu.label}
              {menu.external ? <LinkIcon className="w-3 h-3 ml-1" /> : null}
            </Link>
          ))}
          <LocaleSwitcher
            lang={lang}
            getSwitchUrl={getSwitchUrl}
            onLinkClick={handleLinkClick}
            className="px-3 py-2 border-t border-border/40 mt-1 pt-3"
          />
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
