"use client";

import ProfileCard from "@/components/ProfileCard";
import { LANDING_PAGE } from "@/constants/data";

export default function Home() {
  return (
    <main className="font-cabin h-screen items-center flex justify-center text-gray-200 dark:text-deep max-w-5xl px-12 m-auto">
      <div className="mr-10">
        <h1>
          <span className="text-3xl font-bold">{LANDING_PAGE.greeting}</span>
        </h1>
        <p className="text-xl">{LANDING_PAGE.intro}</p>
      </div>
      <ProfileCard className="w-full max-w-lg rounded-lg shadow" />
    </main>
  );
}
