"use client";

import { Transition } from "@headlessui/react";
import Bunny from "../components/Icons/bunnysden.svg";
import { useEffect, useState } from "react";

export default function Home() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Transition
      show={show}
      enter="transition duration-1000 ease-out"
      enterFrom="transform scale-30 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      className="flex h-full w-full flex-col items-center"
    >
      <Bunny className="h-4/5 w-4/5 flex-1 md:h-1/3 md:w-1/3" />
    </Transition>
  );
}
