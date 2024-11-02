'use client';
import { useEffect, useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { type MenuInput, MENUS } from '@/config/menu';
import Link from '@/components/Link';
import {
  Link as LinkIcon,
  Menu as MenuIcon,
  X as CloseIcon,
} from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';
import { MemoizedSVG } from '../MemoizedSVG';

export default function Navigation() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  return (
    <header className="flex sm:flex-row">
      <div className="flex items-center">
        <button
          type="button"
          className="sm:hidden max-sm:p-4"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <MenuIcon className="h-6 w-6 text-cappuccino" />
        </button>
      </div>
      <div
        className={`fixed max-sm:flex max-sm:flex-col top-0 left-0 w-full h-full bg-background p-4 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-full justify-between items-center transition-transform sm:relative sm:translate-x-0 sm:flex sm:items-center sm:bg-transparent`}
      >
        <button
          type="button"
          className="absolute top-4 right-4 sm:hidden"
          onClick={handleLinkClick}
        >
          <CloseIcon className="h-6 w-6 text-cappuccino" />
        </button>
        <div className="flex items-center">
          <MemoizedSVG
            aria-label="Bunnys Den logo"
            src="bunnysden.svg"
            className="h-8 w-8 flex-1 hidden sm:block"
          />
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col sm:flex-row sm:gap-x-12">
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
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
