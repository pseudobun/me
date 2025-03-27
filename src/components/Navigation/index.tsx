'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { type MenuInput, MENUS } from '@/config/menu';
import Link from '@/components/Link';
import { Link as LinkIcon, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        'fixed top-4 z-50 transition-all duration-300 ease-in-out',
        'backdrop-blur-xl bg-background/30 border border-border/40 rounded-2xl shadow-lg',
        menuOpen ? 'shadow-xl' : '',
        'w-[calc(100%-3rem)] max-w-7xl left-1/2 -translate-x-1/2',
      )}
    >
      <div className="px-4 w-full">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/dark-logo.svg"
                width={32}
                height={410}
                alt="Bunnys Den Logo"
                priority
              />
            </Link>
            <div className="pl-2  flex flex-col leading-tight font-mono text-muted-foreground">
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
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation - centered */}
          <div className="hidden md:block md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <div className="flex gap-x-12">
              {MENUS.map((menu: MenuInput) => (
                <Link
                  key={menu.label}
                  href={menu.href}
                  isExternal={menu.external}
                >
                  {menu.label}
                  {menu.external ? <LinkIcon className="w-3 h-3 ml-1" /> : null}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: menuOpen ? 'auto' : 0,
          opacity: menuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="md:hidden overflow-hidden"
      >
        <div className="pr-4 pt-2 pb-3 space-y-1">
          {MENUS.map((menu: MenuInput) => (
            <Link
              key={menu.label}
              href={menu.href}
              isExternal={menu.external ? true : undefined}
              onClick={handleLinkClick}
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 transition-colors w-full"
            >
              {menu.label}
              {menu.external ? <LinkIcon className="w-3 h-3 ml-1" /> : null}
            </Link>
          ))}
        </div>
      </motion.div>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-background/50 backdrop-blur-xs z-[-1]"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
}
