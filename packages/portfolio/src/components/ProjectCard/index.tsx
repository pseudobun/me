'use client';
import type React from 'react';
import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import ReactCardFlip from 'react-card-flip';
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
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      {/* Front face */}
      <Card
        className="dark h-96 w-full bg-gradient-to-bl from-gray-700/40 to-gray-800/50"
        isPressable
        isBlurred
        onPress={handleClick}
      >
        <CardHeader className="flex gap-3 h-[4rem] text-left">
          <div className="flex flex-col">
            <p className="text-lg sm:text-xl">{title}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Image
            alt="nextui logo"
            width={480}
            src={image}
            placeholder="blur"
            className="rounded-lg"
          />
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

      {/* Back face */}
      <Card
        className="h-96 w-full dark bg-gradient-to-bl from-gray-700/40 to-gray-800/50"
        isPressable
        onPress={handleClick}
      >
        <CardHeader className="flex gap-3 h-[4rem] text-left">
          <div className="flex flex-col">
            <p className="text-lg sm:text-xl">Description</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <ScrollShadow className="m-2 no-scrollbar text-md sm:text-lg">
            <p className="pt-2">{description}</p>
          </ScrollShadow>
        </CardBody>
        <Divider />
        <CardFooter className="justify-start gap-x-2 h-[3rem]">
          <p className="text-sm sm:text-md">
            Developed at{' '}
            <Link href={orgUrl} target="_blank" className="gap-x-1">
              <span className="text-sm sm:text-md text-wave">{org}</span>
              <ArrowTopRightOnSquareIcon className="text-wave" width={12} />
            </Link>
          </p>
        </CardFooter>
      </Card>
    </ReactCardFlip>
  );
}
