import ProfileCard from '@/components/ProfileCard';
import { PERSONAL } from '@/constants/data.mjs';
import { Transition } from '@headlessui/react';
import ExoticLink from '@/components/ExoticLink';

export const metadata = {
  title: 'About',
};

export default function About() {
  return (
    <div className="flex flex-1 justify-center text-2xl">
      <div className="flex max-w-5xl flex-1 flex-col content-center items-center justify-center text-gray-200 md:flex-row">
        <div className="flex-1 items-center md:order-2 md:w-1/3">
          <ProfileCard />
        </div>
        <Transition
          as="div"
          show={true}
          appear={true}
          enter="transform transition ease-out duration-[1.5s]"
          enterFrom="transform scale-10 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          className="mt-12 flex-1 md:order-1 md:m-12 md:w-2/3 pb-12 lg:pb-0"
        >
          <h1 className="mb-2">
            <span className="text-3xl font-bold">gm 🌱</span>
          </h1>
          <p className="text-xl">
            I'm Urban, a Software Engineer from Maribor, Slovenia. I currently
            work at{' '}
            <ExoticLink
              aria-label="Go to company website"
              blank
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
            as a {PERSONAL.position}. I have a Master's degree in Computer
            Science from{' '}
            <ExoticLink
              aria-label="Go to university website"
              blank
              className="no-underline"
              href={PERSONAL.universityUrl}
            >
              Faculty of Electrical Engineering and Computer Science, University
              of Maribor
            </ExoticLink>
            .
          </p>
        </Transition>
      </div>
    </div>
  );
}
