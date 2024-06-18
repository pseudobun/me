'use client';
import Image from 'next/image';
import { PERSONAL } from '@/constants/data.mjs';
import SocialIcon from '@/components/SocialIcon';
import me from './me.jpg';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const animation = 'hover:animate-bounce';

export default function ProfileCard() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current as unknown as HTMLElement;

    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientX < 0 || event.clientY < 0) return;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 10;
      const rotateY = (x / rect.width) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 1) return;
      const touch = event.touches[0];
      const rect = card.getBoundingClientRect();
      const x = touch.clientX - rect.left - rect.width / 2;
      const y = touch.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 30;
      const rotateY = (x / rect.width) * 30;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'rotateX(0) rotateY(0)';
    };

    const handleTouchEnd = () => {
      card.style.transform = 'rotateX(0) rotateY(0)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('touchmove', handleTouchMove, { passive: false });
    card.addEventListener('touchend', handleTouchEnd);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  return (
    <div
      className="w-full max-w-lg animate-fall3D"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        className="transition-transform duration-100 transform-gpu shadow-2xl rounded-xl bg-gradient-to-tr from-gray-800/50 p-4 to-gray-900/50"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex flex-col items-center pb-2">
          <Image
            width={256}
            height={256}
            className="mb-3 rounded-full shadow-lg"
            placeholder="blur"
            src={me}
            alt="Profile picture"
          />
          <h5 className="mb-1 text-center text-3xl font-bold tracking-wider">
            {PERSONAL.name}
          </h5>
          <span className="flex text-center text-xl">{PERSONAL.position}</span>
          <span className="flex text-xl flex-col items-center">
            <Link
              href={PERSONAL.companyUrl}
              className="text-cappuccino hover:text-wave"
              target="_blank"
              rel="noreferrer"
            >
              {PERSONAL.company}
            </Link>
            <Link
              href={PERSONAL.company2Url}
              className="text-cappuccino hover:text-wave"
              target="_blank"
              rel="noreferrer"
            >
              {' '}
              {PERSONAL.company2}
            </Link>
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-y-2 items-center w-full justify-center space-x-4 text-center align-middle">
          <SocialIcon
            className={animation}
            icon="github"
            href={PERSONAL.github}
          />
          <SocialIcon
            className={animation}
            icon="twitter"
            href={PERSONAL.twitter}
          />
          <SocialIcon
            className={animation}
            icon="linkedin"
            href={PERSONAL.linkedin}
          />
          <SocialIcon
            className={animation}
            icon="telegram"
            href={PERSONAL.telegram}
          />
          <SocialIcon
            className={animation}
            icon="gmail"
            href={PERSONAL.email}
          />
          <SocialIcon
            className={animation}
            icon="farcaster"
            href={PERSONAL.farcaster}
          />
          <SocialIcon className={animation} icon="hey" href={PERSONAL.hey} />
        </div>
      </div>
    </div>
  );
}
