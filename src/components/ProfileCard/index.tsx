import clsx from "clsx";
import { PERSONAL } from "../../constants/data";
import SocialIcon from "../Socials";
import Image from "next/image";

type ProfileCardProps = {
  className?: string;
};

const animation="hover:animate-bounce"

export default function ProfileCard({ className }: ProfileCardProps) {
  return (
    <div className={clsx(className)}>
      <div className="flex flex-col items-center pb-2">
        <Image
          width={256}
          height={256}
          className="w-256 h-256 mb-3 rounded-full shadow-lg"
          src="/academic.JPG"
          alt="Urban Vidovič profile picture"
        />
        <h5 className="mb-1 font-bold text-center text-3xl tracking-wider ">
          {PERSONAL.fullName}
        </h5>
        <span className="text-xl flex text-center">{PERSONAL.position}</span>
        <span className="text-xl flex">
          <a
            href={PERSONAL.companyUrl}
            className="text-cappuccino hover:text-wave"
            target="_blank"
          >
            {" "}
            {PERSONAL.company}
          </a>
        </span>
      </div>
      <div className="mt-2 justify-center flex text-center align-middle items-center space-x-4">
        <SocialIcon className={animation} icon="github" href={PERSONAL.github as string} />
        <SocialIcon className={animation} icon="twitter" href={PERSONAL.twitter as string} />
        <SocialIcon className={animation} icon="linkedin" href={PERSONAL.linkedin as string} />
        <SocialIcon className={animation} icon="gmail" href={PERSONAL.email as string} />
      </div>
    </div>
  );
}
