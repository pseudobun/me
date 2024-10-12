'use client';

import ProfileCard from '@/components/ProfileCard';
import { motion } from 'framer-motion';
import ExoticLink from '@/components/ExoticLink';
import { PERSONAL } from '@/constants/data.mjs';

export default function AboutMe() {
  return (
    <div className="flex max-w-5xl flex-1 flex-col content-center items-center justify-center text-stone-200 md:flex-row">
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        className="flex-1 items-center md:order-2 md:w-1/3"
      >
        <ProfileCard />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delayChildren: 0.4,
              staggerChildren: 0.1,
            },
          },
        }}
        className="mt-12 flex-1 md:order-1 md:m-12 md:w-2/3 pb-12 lg:pb-0"
      >
        <motion.h1
          className="mb-2"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                opacity: { duration: 2 }, // Slower opacity transition
              },
            },
          }}
        >
          <span className="text-3xl font-bold">gm 🌱</span>
        </motion.h1>
        <motion.p
          className="text-xl"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                opacity: { duration: 2 }, // Slower opacity transition
              },
            },
          }}
        >
          I'm Urban, a Software Engineer from Maribor, Slovenia. I currently
          work at{' '}
          <ExoticLink
            aria-label="Go to company website"
            blank
            className="no-underline"
            href={PERSONAL.companyUrl}
          >
            {PERSONAL.company}
          </ExoticLink>{' '}
          and{' '}
          <ExoticLink
            aria-label="Go to company website"
            blank
            className="no-underline"
            href={PERSONAL.company2Url}
          >
            {PERSONAL.company2}
          </ExoticLink>{' '}
          as a {PERSONAL.position}. I have a Master's degree in Computer Science
          from{' '}
          <ExoticLink
            aria-label="Go to university website"
            blank
            className="no-underline"
            href={PERSONAL.universityUrl}
          >
            Faculty of Electrical Engineering and Computer Science, University
            of Maribor
          </ExoticLink>
          .
        </motion.p>
      </motion.div>
    </div>
  );
}
