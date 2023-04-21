import clsx from "clsx";

type ExoticLinkProps = {
  href: string;
  destination: string;
  className?: string;
};

export default function ExoticLink({
  href,
  destination,
  className,
}: ExoticLinkProps) {
  return (
    <a href={href} className={(clsx(className), "hover:text-wave")}>
      {destination}
    </a>
  );
}
