'use client';

import { Globe } from 'lucide-react';
import { motion } from 'motion/react';
import Image, { type StaticImageData } from 'next/image';
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

const githubIcon = siGithub.svg.replace(/<title>.*?<\/title>/, '');

interface ProjectCardProps {
  delay: number;
  description: string;
  developedAt: string;
  github?: string;
  highlight?: boolean;
  image: StaticImageData;
  org: string;
  orgUrl: string;
  readMore: string;
  showLess: string;
  tags: string[];
  tagsLabel: string;
  title: string;
  website?: string;
}

export default function ProjectCard({
  delay,
  description,
  developedAt,
  github,
  highlight,
  image,
  org,
  orgUrl,
  readMore,
  showLess,
  tags,
  tagsLabel,
  title,
  website,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasExpandableDescription = description.length > 160;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay,
      }}
      className="h-full"
    >
      <Card
        className={cn(
          'relative overflow-hidden h-full transition-all duration-300 flex flex-col',
          highlight && 'border-primary/50 shadow-md'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
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
              alt={`${title} project screenshot`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-linear-to-t from-background to-transparent"
              animate={{ opacity: isHovered ? 0.5 : 0.7 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        <div className="relative z-10 flex flex-col grow">
          <CardHeader className="text-xl">
            <motion.div
              initial={{ x: -5 }}
              animate={{ x: isHovered ? 0 : -5 }}
              transition={{ duration: 0.3 }}
            >
              <CardTitle className="text-foreground">{title}</CardTitle>
              <CardDescription>
                {developedAt}{' '}
                <ExoticLink href={orgUrl} ariaLabel={`Open ${org}`}>
                  {org}
                </ExoticLink>
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="text-foreground/90 grow space-y-4">
            <motion.div
              className={cn(
                'relative transition-all',
                isExpanded ? 'max-h-[500px]' : 'max-h-[96px] overflow-hidden'
              )}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <p>{description}</p>
              {!isExpanded && hasExpandableDescription ? (
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-background to-transparent" />
              ) : null}
            </motion.div>

            {hasExpandableDescription ? (
              <motion.button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                className="text-sm cursor-pointer text-primary hover:text-primary/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExpanded ? showLess : readMore}
              </motion.button>
            ) : null}

            <ul aria-label={tagsLabel} className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex items-center rounded-full border border-border/70 bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="space-x-4 mt-auto">
            {website ? (
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <ExoticLink href={website} ariaLabel={`Open ${title} website`}>
                  <Globe className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                </ExoticLink>
              </motion.div>
            ) : null}
            {github ? (
              <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                <ExoticLink href={github} ariaLabel={`Open ${title} source code`}>
                  <span
                    className="block w-5 h-5 fill-muted-foreground hover:fill-foreground transition-colors"
                    dangerouslySetInnerHTML={{ __html: githubIcon }}
                  />
                </ExoticLink>
              </motion.div>
            ) : null}
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
