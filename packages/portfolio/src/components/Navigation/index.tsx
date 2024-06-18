'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sling as Hamburger } from 'hamburger-react';
import Menu from '@/components/Menu';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => {};
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="fixed left-1/2 bottom-4 transform -translate-x-1/2 z-50 md:left-6 lg:bottom-auto md:top-6 md:transform-none">
        <div className="max-sm:bg-gradient-to-bl from-gray-700/40 to-gray-800/50 backdrop-blur-md md:backdrop-blur-none p-1 lg:p-0 rounded-full">
          <Hamburger
            aria-label="Open menu"
            size={24}
            toggled={isOpen}
            toggle={setIsOpen}
            onToggle={openMenu}
            rounded={true}
          />
        </div>
      </div>
      <div className="z-40">
        <Menu isOpen={isOpen} />
      </div>
    </>
  );
}
