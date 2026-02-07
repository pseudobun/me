'use client';
import { Globe } from 'lucide-react';
import { motion } from 'motion/react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useState } from 'react';
import { siGithub } from 'simple-icons';
import ExoticLink from '@/components/ExoticLink';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  website: string | undefined;
  image: StaticImageData;
  org: string;
  orgUrl: string;
  github: string | undefined;
  delay: number;
  highlight?: boolean;
}

export default function ProjectCard({
  title,
  description,
  website,
  github,
  org,
  orgUrl,
  image,
  delay,
  highlight,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: delay,
      }}
      className="h-full"
    >
      <Card
        className={cn(
          'relative overflow-hidden h-full transition-all duration-300',
          'flex flex-col',
          highlight && 'border-primary/50 shadow-md'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section - Now more prominent */}
        <motion.div
          className="relative w-full h-48 overflow-hidden"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: isHovered ? 1 : 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <Image
              src={image}
              alt={`${title} screenshot`}
              fill
              className="object-cover"
              priority={false}
            />
            <motion.div
              className="absolute inset-0 bg-linear-to-t from-background to-transparent"
              animate={{ opacity: isHovered ? 0.5 : 0.7 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* Card Content */}
        <div className="relative z-10 flex flex-col grow">
          <CardHeader className="text-xl">
            <motion.div
              initial={{ x: -5 }}
              animate={{ x: isHovered ? 0 : -5 }}
              transition={{ duration: 0.3 }}
            >
              <CardTitle className="text-foreground">{title}</CardTitle>
              <CardDescription>
                Developed @ <ExoticLink href={orgUrl}>{org}</ExoticLink>
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="text-foreground/90 grow">
            <motion.div
              className={cn(
                'relative transition-all',
                isExpanded ? 'max-h-[500px]' : 'max-h-[80px] overflow-hidden'
              )}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <p>{description}</p>
              {!isExpanded && description.length > 120 && (
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-background to-transparent" />
              )}
            </motion.div>
            {description.length > 120 && (
              <motion.button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm cursor-pointer text-primary hover:text-primary/80 mt-2 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </motion.button>
            )}
          </CardContent>
          <CardFooter className="space-x-4 mt-auto">
            {website && (
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <ExoticLink href={website} blank>
                  <Globe className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                </ExoticLink>
              </motion.div>
            )}
            {github && (
              <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                <ExoticLink href={github}>
                  <div
                    className="w-5 h-5 fill-muted-foreground hover:fill-foreground transition-colors"
                    dangerouslySetInnerHTML={{ __html: siGithub.svg }}
                  />
                </ExoticLink>
              </motion.div>
            )}
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
