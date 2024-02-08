'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sling as Hamburger } from 'hamburger-react';
import Menu from '../Menu';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => {};
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="fixed left-6 top-6 z-50">
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
          onToggle={openMenu}
          rounded={true}
        />
      </div>
      <div className="z-40">
        <Menu isOpen={isOpen} />
      </div>
    </>
  );
}
