"use client";

import ProfileCard from "@/components/ProfileCard";
import { LANDING_PAGE } from "@/constants/data";

export default function Home() {
  return (
    <main className=" font-cabin items-center flex justify-center text-gray-200 dark:text-deep px-12">
      <div
        id="mainContent"
        className="sm:flex sm:flex-row mt-12 m-auto max-w-5xl justify-center"
      >
        <div className="sm:order-2 basis-1/3">
          <ProfileCard className="w-full min-w-sm max-w-lg rounded-lg shadow" />
        </div>
        <div className="m-24 basis-2/3 sm:order-1">
          <h1>
            <span className="text-3xl font-bold">{LANDING_PAGE.greeting}</span>
          </h1>
          <p className="text-xl">{LANDING_PAGE.intro}</p>
        </div>
      </div>
    </main>
  );
}
