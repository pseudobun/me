import ExoticLink from "../ExoticLink";

export default function ExoticNavbar() {
  return (
    <div className="flex font-ubuntu font-bold pt-12 align-middle">
      <nav className="w-screen">
        <div id="logo" className="flex absolute pl-6 text-4xl">
          {/* <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg> */}
          {/* <span className="font-ubuntu font-bold tracking-tight">UV</span> */}
        </div>
        <div className="flex-1 flex items-center text-3xl space-x-32 justify-center space-x-">
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
