import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Transition } from '@headlessui/react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { type MenuInput, MENUS } from '@/config/menu';
import ExoticLink from '../ExoticLink';
import clsx from 'clsx';

interface MenuProps {
  isOpen: boolean;
}

export default function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();

  return (
    <Transition
      as="div"
      show={isOpen}
      enter="transition duration-500 ease-out"
      enterFrom="transform scale-60 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-500 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-60 opacity-0"
      className="z-90 fixed inset-0 flex flex-col bg-gradient-to-tr from-black to-gray-800"
    >
      <div className="flex flex-1 flex-col items-center justify-center space-y-4 text-2xl">
        {MENUS.map((menu: MenuInput) =>
          menu?.external ? (
            <div key={menu.label} className="flex space-x-2">
              <ExoticLink
                key={menu.label}
                href={menu.href}
                blank
                rel="noreferrer noopener"
                className="flex gap-1 hover:text-3xl"
              >
                {menu.label}
                <ArrowTopRightOnSquareIcon width={16} />
              </ExoticLink>
            </div>
          ) : (
            <ExoticLink
              key={menu.label}
              href={menu.href}
              className={clsx(
                'hover:text-3xl',
                pathname === `${menu.href}` ? 'text-wave font-bold' : '',
              )}
            >
              {menu.label}
            </ExoticLink>
          ),
        )}
      </div>
    </Transition>
  );
}
