'use client';
import { Transition } from '@headlessui/react';
import Bunny from '@/components/Icons/bunnysden.svg';
import Typewriter from 'typewriter-effect';

export default function Home() {
  return (
    <Transition
      as="div"
      show={true}
      appear={true}
      enter="transform transition ease-out"
      enterFrom="transform scale-30 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      className="flex h-full w-full flex-col gap-y-2 items-center"
    >
      <Bunny className="h-4/5 w-4/5 flex-1 md:h-1/3 md:w-1/3" />
      <div className="font-mono text-2xl text-gray-300 max-w-full">
        <Typewriter
          options={{ cursor: '█' }}
          onInit={(typewriter) => {
            typewriter.changeDelay(10).typeString("Bunny's Den").start();
          }}
        />
      </div>
    </Transition>
  );
}
