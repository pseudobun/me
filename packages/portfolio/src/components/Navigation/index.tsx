"use client";

import { Sling as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import Menu from "../Menu";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => {};
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const genKeyPar = async () => {
      const { generate_keypair } = await import("@pseudobun/encryption");
      const pair = await generate_keypair();
      console.log(
        "🚀 ~ file: index.tsx:23 ~ useEffect ~ pair: ",
        JSON.parse(pair)
      );
    };
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
