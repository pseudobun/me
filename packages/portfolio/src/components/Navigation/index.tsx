import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { type MenuInput, MENUS } from '@/config/menu';
import Link from '@/components/Link';
import { Link as LinkIcon } from 'lucide-react';

export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="max-md:gap-x-4 gap-x-12">
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
  );
}
