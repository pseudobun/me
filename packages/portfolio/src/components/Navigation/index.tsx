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

  useEffect(() => {
    const genKeyPar = async () => {
      const { generate_keypair: generateKeypair } = await import(
        '@pseudobun/encryption'
      );
      const pair = await generateKeypair();
      // eslint-disable-next-line no-console
      console.log(
        '🚀 ~ file: index.tsx:23 ~ useEffect ~ pair: ',
        JSON.parse(pair)
      );
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    genKeyPar();
  }, []);

  return (
    <>
      <div className="fixed left-6 top-6 z-40">
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
          onToggle={openMenu}
          rounded={true}
        />
      </div>
      <Menu isOpen={isOpen} />
    </>
  );
}
