'use client';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
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
import clsx from 'clsx';

interface ProjectCardProps {
  title: string;
  description: string;
  website: string | undefined;
  image: StaticImageData;
  org: string;
  orgUrl: string;
  github: string | undefined;
  delay: number;
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
}: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  useEffect(() => {
    const card = cardRef.current as unknown as HTMLElement;
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientX < 0 || event.clientY < 0) return;
      const rect = (card as Element).getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 30;
      const rotateY = (x / rect.width) * 30;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'rotateX(0) rotateY(0)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  return (
    <div
      style={{ perspective: '1000px', animationDelay: `${delay}s` }}
      className="animate-fall3D opacity-0"
    >
      <div
        ref={cardRef}
        className="transition-transform duration-100 transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          {/* Front face */}
          <Card
            className="dark h-96 w-full max-w-[460px] bg-gradient-to-bl from-gray-700/40 to-gray-800/50"
            isBlurred
            isPressable
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
                width={460}
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
            className="h-96 w-full max-w-[460px] dark bg-gradient-to-bl from-gray-700/40 to-gray-800/50"
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
      </div>
    </div>
  );
}
