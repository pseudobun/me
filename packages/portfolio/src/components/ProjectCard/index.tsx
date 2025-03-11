'use client';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ExoticLink from '@/components/ExoticLink';
import { siGithub } from 'simple-icons';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  website: string | undefined;
  image: StaticImageData;
  org: string;
  orgUrl: string;
  github: string | undefined;
  delay: number;
  firstInRow?: boolean;
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
  firstInRow,
  highlight,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className={cn(
        'relative overflow-hidden group h-full transition-all duration-300',
        'flex flex-col',
        highlight && 'border-primary/50 shadow-md',
      )}
    >
      {/* Background Image with Blur/Dim Effect */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full opacity-20">
          <Image
            src={image}
            alt={`${title} screenshot`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80" />
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">
        <CardHeader className="text-xl">
          <CardTitle className="text-foreground">{title}</CardTitle>
          <CardDescription>
            Developed @ <ExoticLink href={orgUrl}>{org}</ExoticLink>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-foreground/90 flex-grow">
          <div
            className={cn(
              'relative transition-all duration-300',
              isExpanded ? 'max-h-[500px]' : 'max-h-[80px] overflow-hidden',
            )}
          >
            <p>{description}</p>
            {!isExpanded && description.length > 120 && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
            )}
          </div>
          {description.length > 120 && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-primary hover:text-primary/80 mt-2 transition-colors"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </CardContent>
        <CardFooter className="space-x-4 mt-auto">
          {website && (
            <ExoticLink href={website} blank>
              <Globe className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </ExoticLink>
          )}
          {github && (
            <ExoticLink href={github}>
              <div
                className="w-5 h-5 fill-muted-foreground hover:fill-foreground transition-colors"
                dangerouslySetInnerHTML={{ __html: siGithub.svg }}
              />
            </ExoticLink>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
