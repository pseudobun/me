import Link from 'next/link';
import bunny from '../../public/bunnysden.svg';
import { MemoizedSVG } from '@/components/MemoizedSVG';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <MemoizedSVG
        aria-label="Bunnys Den logo"
        src="bunnysden.svg"
        className="h-4/5 w-4/5 flex-1 md:h-1/3 md:w-1/3 animate-pulse"
      />
      <p className="text-md text-center md:text-xl text-gray-200">
        404: You ain't gonna find anything here
      </p>
      <Link
        aria-label="Go to homepage"
        href="/"
        className="text-cappuccino hover:text-wave"
      >
        Home
      </Link>
    </div>
  );
}
