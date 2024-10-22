'use client';
import ExoticLink from '@/components/ExoticLink';
import { PERSONAL } from '@/constants/data.mjs';

export default function Home() {
  return (
    <div className="flex flex-col max-w-[1024px]">
      <span className="text-2xl font-bold">gm 🌱</span>
      <p className="text-lg">
        I'm Urban, a Software Engineer from Maribor, Slovenia. I currently work
        at{' '}
        <ExoticLink
          aria-label="Go to company website"
          className="no-underline"
          href={PERSONAL.companyUrl}
        >
          {PERSONAL.company}
        </ExoticLink>{' '}
        and{' '}
        <ExoticLink
          aria-label="Go to company website"
          blank
          className="no-underline"
          href={PERSONAL.company2Url}
        >
          {PERSONAL.company2}
        </ExoticLink>{' '}
        as a {PERSONAL.position}. I have a Master's degree in Computer Science
        acquired at{' '}
        <ExoticLink
          blank
          className="no-underline"
          href={PERSONAL.universityUrl}
        >
          Faculty of Electrical Engineering and Computer Science, University of
          Maribor
        </ExoticLink>
        .
      </p>
      {/* <div className="flex h-full w-full flex-col gap-y-2 items-center">
        <MemoizedSVG
          aria-label="Bunnys Den logo"
          src="bunnysden.svg"
          className="h-24 w-24 pt-4 flex-1 md:h-1/3 md:w-1/3"
        />
      </div> */}
    </div>
  );
}
