import React from 'react';
import Image, { type StaticImageData } from 'next/image';
import {
  ArrowTopRightOnSquareIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  ScrollShadow,
} from '@nextui-org/react';
import Github from '../Icons/github.svg';

interface ProjectCardProps {
  title: string;
  description: string;
  website: string | undefined;
  image: StaticImageData;
  org: string;
  orgUrl: string;
  github: string | undefined;
}

export default function ProjectCard({
  title,
  description,
  website,
  github,
  org,
  orgUrl,
  image,
}: ProjectCardProps) {
  return (
    <Card className="w-full dark">
      <CardHeader className="flex gap-3 h-[4rem]">
        <div className="flex flex-col">
          <p className="text-lg sm:text-xl">{title}</p>
          <Link href={orgUrl} target="_blank" className="gap-x-1">
            <p className="text-sm sm:text-md text-wave">{org}</p>
            <ArrowTopRightOnSquareIcon className="text-wave" width={12} />
          </Link>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <Image
          alt="nextui logo"
          width={1024}
          src={image}
          placeholder="blur"
          className="rounded-lg"
        />
        <ScrollShadow className="min-h-[64px] h-[128px] m-2 no-scrollbar text-md sm:text-lg">
          <p className="pt-2">{description}</p>
        </ScrollShadow>
      </CardBody>
      <Divider />
      <CardFooter className="justify-end gap-x-2 h-[3rem]">
        {website && (
          <Link href={website} target="_blank">
            <GlobeAltIcon color="white" className={'h-[36px] w-[36px]'} />
          </Link>
        )}
        {github && (
          <Link href={github} target="_blank">
            <Github className={'h-[32px] w-[32px]'} />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
