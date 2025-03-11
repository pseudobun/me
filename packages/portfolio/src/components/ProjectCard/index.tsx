'use client';
import type { StaticImageData } from 'next/image';
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
  return (
    <Card>
      <CardHeader className="text-xl">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Developed @ <ExoticLink href={orgUrl}>{org}</ExoticLink>
        </CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="space-x-4">
        {website && (
          <ExoticLink href={website} blank>
            <Globe className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </ExoticLink>
        )}
        {github && (
          <ExoticLink href={github}>
            <div
              className="w-4 h-4 fill-muted-foreground hover:fill-foreground"
              dangerouslySetInnerHTML={{ __html: siGithub.svg }}
            />
          </ExoticLink>
        )}
      </CardFooter>
    </Card>
  );
}
