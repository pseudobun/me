import ExoticLink from "../ExoticLink";
import Bunny from "../Icons/bunnysden.svg";

export default function ExoticNavbar() {
  return (
    <div className="flex font-ubuntu font-bold m-6 sm:m-12">
      <nav className="w-full">
        <div className="flex-1 absolute">
          <Bunny className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32" />
        </div>
        <div className="flex-1 flex sm:text-xl md:text-3xl sm:mt-12 mt-6 space-x-12 sm:space-x-16 md:space-x-28 sm:justify-center justify-end space-x-">
          <ExoticLink
            href="/"
            className={
              "block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4"
            }
            destination={"Home"}
          />
          <ExoticLink
            href="/about"
            className={
              "block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4"
            }
            destination={"About"}
          />
          <ExoticLink
            href="/projects"
            className={
              "block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4"
            }
            destination={"Projects"}
          />
        </div>
      </nav>
    </div>
  );
}
