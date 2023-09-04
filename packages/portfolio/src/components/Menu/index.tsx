import { MENUS, MenuInput } from "../../config";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuProps = {
  isOpen: boolean;
};

export default function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  return (
    <Transition
      show={isOpen}
      enter="transition duration-500 ease-out"
      enterFrom="transform scale-60 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-500 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-60 opacity-0"
      className="absolute inset-0 z-10 flex flex-col bg-gradient-to-tr from-black to-gray-800"
    >
      <div className="flex flex-1 flex-col items-center justify-center space-y-4 text-2xl">
        {MENUS.map((menu: MenuInput) =>
          menu?.external ? (
            <div key={menu.label} className="flex space-x-2">
              <a
                key={menu.label}
                href={menu.href}
                target="_blank"
                className={`underline hover:text-wave hover:opacity-80 
              active:opacity-50`}
              >
                {menu.label}
              </a>
              <ArrowTopRightOnSquareIcon width={20} />
            </div>
          ) : (
            <Link
              key={menu.label}
              href={menu.href}
              className={`hover:text-wave hover:opacity-80 active:opacity-50 ${
                pathname === menu.href ? "text-wave underline" : ""
              }`}
            >
              {menu.label}
            </Link>
          )
        )}
      </div>
    </Transition>
  );
}
