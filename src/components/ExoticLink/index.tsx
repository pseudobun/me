import clsx from "clsx";

type IExoticLink = {
  href: string;
  destination: string;
  className?: string;
};

export default function ExoticLink({
  href,
  destination,
  className,
}: IExoticLink) {
  return (
    <a href={href} className={clsx(className)}>
      {destination}
    </a>
  );
}
