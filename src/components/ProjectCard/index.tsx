'use client';

import { Expand, Globe, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image, { type StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { siAppstore, siGithub } from 'simple-icons';
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
const appStoreIcon = siAppstore.svg.replace(/<title>.*?<\/title>/, '');

function getProjectMonogram(title: string) {
  return title
    .split(/[\s:-]+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

interface ProjectCardProps {
  appStore?: string;
  delay: number;
  description: string;
  developedAt: string;
  github?: string;
  highlight?: boolean;
  image?: StaticImageData;
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
  appStore,
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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasExpandableDescription = description.length > 160;
  const hasActions = Boolean(website || github || appStore);
  const previewImage = image ?? null;
  const projectMonogram = getProjectMonogram(title);
  const screenshotAlt = `${title} project screenshot`;

  useEffect(() => {
    if (!isPreviewOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPreviewOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPreviewOpen]);

  const previewModal =
    previewImage && typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            {isPreviewOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-background/82 px-4 py-5 backdrop-blur-xl sm:px-8"
                onClick={() => setIsPreviewOpen(false)}
              >
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(234,209,134,0.18),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(134,152,235,0.18),_transparent_38%)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 16 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                  className="relative flex w-full items-center justify-center"
                >
                  <div className="pointer-events-none absolute -inset-6 rounded-[2.25rem] bg-[radial-gradient(circle,_rgba(234,209,134,0.18),_transparent_58%)] blur-3xl" />

                  <div
                    className="relative inline-flex max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)]"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setIsPreviewOpen(false)}
                      className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white/80 backdrop-blur-md transition-colors hover:bg-black/65 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label={`Close ${title} screenshot preview`}
                    >
                      <X className="h-5 w-5" />
                    </button>

                    <Image
                      src={previewImage}
                      alt={screenshotAlt}
                      width={previewImage.width}
                      height={previewImage.height}
                      priority={isPreviewOpen}
                      sizes="100vw"
                      className="h-auto max-h-[84vh] w-auto max-w-full rounded-[1.6rem] object-contain shadow-[0_28px_90px_rgba(0,0,0,0.45)]"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body
        )
      : null;

  return (
    <>
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
            'relative flex h-full flex-col overflow-hidden transition-all duration-300',
            highlight && 'border-primary/50 shadow-md'
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-48 w-full overflow-hidden">
            <div className="relative h-full w-full">
              {image ? (
                <motion.button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  aria-label={`Open full-size screenshot preview for ${title}`}
                  className="group relative h-full w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  whileTap={{ scale: 0.985 }}
                >
                  <Image
                    src={image}
                    alt={screenshotAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-linear-to-t from-background via-background/15 to-transparent"
                    animate={{ opacity: isHovered ? 0.48 : 0.72 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(234,209,134,0.24),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(134,152,235,0.18),_transparent_38%)]"
                    animate={{ opacity: isHovered ? 1 : 0.7 }}
                    transition={{ duration: 0.35 }}
                  />
                  <motion.div
                    aria-hidden="true"
                    className="absolute right-3 top-3"
                    animate={{ y: isHovered ? 0 : -4, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/35 text-white/85 shadow-[0_10px_35px_rgba(0,0,0,0.25)] backdrop-blur-md">
                      <Expand className="h-4 w-4" />
                    </span>
                  </motion.div>
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 ring-1 ring-white/0"
                    animate={{
                      boxShadow: isHovered
                        ? 'inset 0 0 0 1px rgba(255,255,255,0.14), inset 0 -50px 80px rgba(0,0,0,0.16)'
                        : 'inset 0 0 0 1px rgba(255,255,255,0), inset 0 -30px 60px rgba(0,0,0,0.1)',
                    }}
                    transition={{ duration: 0.28 }}
                  />
                </motion.button>
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-full w-full items-end bg-linear-to-br from-primary/20 via-muted/70 to-background px-6 py-5"
                >
                  <div className="rounded-2xl border border-border/70 bg-background/85 px-4 py-3 shadow-sm backdrop-blur-sm">
                    <span className="text-3xl font-semibold tracking-[0.3em] text-foreground/80">
                      {projectMonogram}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 flex grow flex-col">
            <CardHeader className="text-xl">
              <div>
                <CardTitle className="text-foreground">{title}</CardTitle>
                <CardDescription>
                  {developedAt}{' '}
                  <ExoticLink href={orgUrl} ariaLabel={`Open ${org}`}>
                    {org}
                  </ExoticLink>
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="grow space-y-4 text-foreground/90">
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
                  className="cursor-pointer text-sm text-primary transition-colors hover:text-primary/80"
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

            {hasActions ? (
              <CardFooter className="mt-auto space-x-4">
                {website ? (
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                    <ExoticLink href={website} ariaLabel={`Open ${title} website`}>
                      <Globe className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                    </ExoticLink>
                  </motion.div>
                ) : null}
                {github ? (
                  <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                    <ExoticLink href={github} ariaLabel={`Open ${title} source code`}>
                      <span
                        className="block h-5 w-5 fill-muted-foreground transition-colors hover:fill-foreground"
                        dangerouslySetInnerHTML={{ __html: githubIcon }}
                      />
                    </ExoticLink>
                  </motion.div>
                ) : null}
                {appStore ? (
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                    <ExoticLink href={appStore} ariaLabel={`Open ${title} on the App Store`}>
                      <span
                        className="block h-5 w-5 fill-muted-foreground transition-colors hover:fill-foreground"
                        dangerouslySetInnerHTML={{ __html: appStoreIcon }}
                      />
                    </ExoticLink>
                  </motion.div>
                ) : null}
              </CardFooter>
            ) : null}
          </div>
        </Card>
      </motion.div>

      {previewModal}
    </>
  );
}
