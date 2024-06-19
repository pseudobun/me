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
import Github from '@/components/Icons/github.svg';
import clsx from 'clsx';
import ExoticLink from '../ExoticLink';

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
  const [isFlipped, setIsFlipped] = useState(false);
  const [showClickMe, setShowClickMe] = useState(firstInRow);
  const [hideProjectCardOverlay, setHideProjectCardOverlay] = useState(false);
  const cardRef = useRef(null);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
    setShowClickMe(false);
    localStorage.setItem('hideProjectCardOverlay', 'true');
  };
  useEffect(() => {
    const hideProjectCardOverlay = localStorage.getItem(
      'hideProjectCardOverlay'
    );
    if (hideProjectCardOverlay === 'true') {
      setHideProjectCardOverlay(true);
    }
    const card = cardRef.current as unknown as HTMLElement;
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientX < 0 || event.clientY < 0) return;
      const rect = (card as Element).getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 10;
      const rotateY = (x / rect.width) * 10;

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
  useEffect(() => {
    if (firstInRow) {
      const timer = setTimeout(() => {
        setShowClickMe(false);
        setHideProjectCardOverlay(false);
        localStorage.setItem('hideProjectCardOverlay', 'true');
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [firstInRow]);
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
            isFooterBlurred
            className={clsx(
              'dark border-none h-96 w-full max-w-[512px] bg-gradient-to-bl from-gray-700/40 to-gray-800/50',
              highlight ? 'animate-glow' : ''
            )}
            isBlurred
            isPressable
            onPress={handleClick}
          >
            {showClickMe &&
              (hideProjectCardOverlay ? null : (
                <div className="absolute flex backdrop-blur-md h-full w-full inset-0 z-10 rounded-lg bg-gradient-to-b from-black/50 to-gray-900/50 items-center justify-center">
                  <p className="animate-pulse text-xl">
                    Click me for more info!
                  </p>
                </div>
              ))}
            <CardHeader className="justify-between py-1 absolute rounded-xl bg-gradient-to-bl from-gray-700/90 to-gray-800/80 top-1  w-[calc(100%_-_8px)] shadow-lg ml-1 z-10">
              <div className="flex flex-col">
                <p className="text-lg items-start sm:text-xl">{title}</p>
              </div>
              <div className="flex gap-x-2">
                {website && (
                  <Link href={website} target="_blank">
                    <GlobeAltIcon
                      color="white"
                      className={'h-[28px] w-[28px]'}
                    />
                  </Link>
                )}
                {github && (
                  <Link href={github} target="_blank">
                    <Github className={'h-[24px] w-[24px]'} />
                  </Link>
                )}
              </div>
            </CardHeader>
            <Image
              alt="project image"
              src={image}
              placeholder="blur"
              width={460}
              className="z-0 w-full h-full object-cover rounded-lg backdrop-blur-sm"
            />
            <Divider />
          </Card>

          {/* Back face */}
          <Card
            className={clsx(
              'dark border-none h-96 w-full max-w-[512px] bg-gradient-to-bl from-gray-700/40 to-gray-800/50',
              highlight ? 'animate-glow' : ''
            )}
            isPressable
            disableRipple
            onPress={handleClick}
          >
            <CardHeader className="flex gap-3 text-left">
              <div className="flex flex-col">
                <p className="text-lg sm:text-xl">Description</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <ScrollShadow className="no-scrollbar text-md sm:text-lg">
                <p>{description}</p>
              </ScrollShadow>
            </CardBody>
            <Divider />
            <CardFooter className="justify-start gap-x-2 h-[3rem] text-sm sm:text-md">
              Developed at{' '}
              <ExoticLink
                href={orgUrl}
                className="flex gap-1 sm:hover:text-md md:hover:text-lg"
                blank
              >
                {org}
                <ArrowTopRightOnSquareIcon width={12} />
              </ExoticLink>
            </CardFooter>
          </Card>
        </ReactCardFlip>
      </div>
    </div>
  );
}
