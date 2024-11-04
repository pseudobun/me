import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { type MenuInput, MENUS } from '@/config/menu';
import Link from '@/components/Link';
import { Link as LinkIcon } from 'lucide-react';
import { MemoizedSVG } from '@/components/MemoizedSVG';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Navigation() {
  return (
    <header className="flex justify-between items-center gap-x-12 p-4 w-full">
      <div className="flex items-center">
        <MemoizedSVG
          aria-label="Bunnys Den logo"
          src="bunnysden.svg"
          className="h-8 w-8 flex-1"
        />
      </div>
      <NavigationMenu>
        <NavigationMenuList className="flex-wrap max-md:gap-x-4 gap-x-12">
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
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
}
