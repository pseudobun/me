'use client';
import { siGithub, siX, siLinkedin, siKeybase } from 'simple-icons';
import ExoticLink from '../ExoticLink';
import { Mail } from 'lucide-react';
import { PERSONAL } from '@/constants/data.mjs';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="w-full relative mt-auto bg-background">
      <div
        className={cn(
          'flex p-4 px-6 max-md:flex-col gap-x-12 gap-y-4 justify-between items-center',
          'text-muted-foreground fill-muted-foreground',
          'w-full max-w-7xl md:max-w-7xl mx-auto',
        )}
      >
        <div className="max-md:order-2">
          <p className="text-center">
            &copy; {new Date().getFullYear()} Urban Vidovič. All rights
            reserved.
          </p>
        </div>
        <div className="flex space-x-4 max-md:order-1">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExoticLink href={PERSONAL.github}>
              <div
                dangerouslySetInnerHTML={{
                  __html: siGithub.svg,
                }}
                className="w-6 h-6 fill-muted-foreground hover:fill-foreground"
              />
            </ExoticLink>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExoticLink href={`${PERSONAL.keybase}`}>
              <div
                dangerouslySetInnerHTML={{
                  __html: siKeybase.svg,
                }}
                className="w-6 h-6 fill-muted-foreground hover:fill-foreground"
              />
            </ExoticLink>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExoticLink href={PERSONAL.twitter}>
              <div
                dangerouslySetInnerHTML={{
                  __html: siX.svg,
                }}
                className="w-6 h-6 fill-muted-foreground hover:fill-foreground"
              />
            </ExoticLink>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExoticLink href={PERSONAL.linkedin}>
              <div
                dangerouslySetInnerHTML={{
                  __html: siLinkedin.svg,
                }}
                className="w-6 h-6 fill-muted-foreground hover:fill-foreground"
              />
            </ExoticLink>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExoticLink href={`mailto:${PERSONAL.email}`}>
              <Mail className="w-6 h-6 text-muted-foreground hover:text-foreground" />
            </ExoticLink>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
