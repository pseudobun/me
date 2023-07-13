import ProfileCard from "@/components/ProfileCard";
import { LANDING_PAGE } from "@/constants/data";

export default function About() {
  return (
    <div id="parent" className="flex flex-1 justify-center">
      <div className="flex max-w-5xl flex-1 flex-col content-center items-center justify-center pt-20 text-gray-200 md:flex-row md:pt-0">
        <div className="flex-1 items-center md:order-2 md:w-1/3">
          <ProfileCard className="w-full max-w-lg" />
        </div>
        <div className="my-12 flex-1 md:order-1 md:m-12 md:w-2/3">
          <h1>
            <span className="text-3xl font-bold">{LANDING_PAGE.greeting}</span>
          </h1>
          <p className="text-xl">{LANDING_PAGE.intro}</p>
        </div>
      </div>
    </div>
  );
}
