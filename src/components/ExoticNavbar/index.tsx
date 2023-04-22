import ExoticLink from "../ExoticLink";
import Bunny from "../Icons/bunnysden.svg";

export default function ExoticNavbar() {
  return (
    <div className="flex font-ubuntu font-bold m-12 align-middle">
      <nav className="w-full">
        <div className="flex-1 absolute">
          <Bunny className="w-32 h-32" />
        </div>
        <div className="flex-1 flex items-center text-3xl mt-12 space-x-32 justify-center space-x-">
          {/* <ExoticLink
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
          /> */}
        </div>
      </nav>
    </div>
  );
}
