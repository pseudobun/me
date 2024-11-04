'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { type MenuInput, MENUS } from '@/config/menu';
import Link from '@/components/Link';
import { Link as LinkIcon, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="relative flex justify-between items-center p-4 w-full">
      <button
        className="md:hidden block"
        onClick={() => setMenuOpen(!menuOpen)}
        type="button"
      >
        <Menu className="w-6 h-6 text-cappuccino" />
      </button>
      <motion.div
        initial={{ x: '-115%' }}
        animate={{ x: menuOpen ? -5 : '-115%' }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
        className="flex min-w-32 flex-col fixed top-4 left-4 border rounded-lg backdrop-blur-2xl shadow-lg md:hidden z-20"
      >
        <div className="flex p-2 pb-0 justify-end">
          <button onClick={() => setMenuOpen(false)} type="button">
            <X className="w-6 h-6 text-cappuccino" />
          </button>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col  px-4 pb-4">
            {MENUS.map((menu: MenuInput) => (
              <NavigationMenuItem key={menu.label}>
                <Link
                  href={menu.href}
                  isExternal={menu.external ? true : undefined}
                  onClick={handleLinkClick}
                >
                  {menu.label}
                  {menu.external ? <LinkIcon className="w-3 h-3" /> : null}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </motion.div>
      {menuOpen && (
        <div
          className="fixed inset-0 opacity-50 z-10"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-x-12">
            {MENUS.map((menu: MenuInput) => (
              <NavigationMenuItem key={menu.label}>
                <Link
                  href={menu.href}
                  isExternal={menu.external ? true : undefined}
                >
                  {menu.label}
                  {menu.external ? <LinkIcon className="w-3 h-3" /> : null}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
}
