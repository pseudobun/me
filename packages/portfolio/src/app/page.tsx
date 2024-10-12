'use client';
import { MemoizedSVG } from '@/components/MemoizedSVG';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 50, damping: 10 }}
      className="flex h-full w-full flex-col gap-y-2 items-center"
    >
      <MemoizedSVG
        aria-label="Bunnys Den logo"
        src="bunnysden.svg"
        className="h-4/5 w-4/5 flex-1 md:h-1/3 md:w-1/3"
      />
      <div className="font-mono text-2xl text-gray-300 max-w-full">
        <Typewriter
          options={{ cursor: '█' }}
          onInit={(typewriter) => {
            typewriter.changeDelay(10).typeString("Bunny's Den").start();
          }}
        />
      </div>
    </motion.div>
  );
}
