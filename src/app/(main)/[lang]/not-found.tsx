'use client';

import { useParams } from 'next/navigation';
import en from '@/dictionaries/en.json';
import sl from '@/dictionaries/sl.json';

const messages = {
  en: en.notFound.message,
  sl: sl.notFound.message,
};

export default function NotFound() {
  const params = useParams<{ lang?: string }>();
  const message = params?.lang === 'sl' ? messages.sl : messages.en;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <p className="text-md text-center md:text-xl text-stone-200">{message}</p>
    </div>
  );
}
