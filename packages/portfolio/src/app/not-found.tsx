import Link from 'next/link';
import Bunny from '@/components/Icons/bunnysden.svg';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Bunny className="h-2/5 w-2/5 flex-1 md:h-1/5 md:w-1/5" />
      <p className="text-md text-center md:text-xl text-gray-200">
        404: You ain't gonna find anything here
      </p>
      <Link href="/" className="text-cappuccino hover:text-wave">
        Home
      </Link>
    </div>
  );
}
