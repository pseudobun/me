'use client';

import { useParams } from 'next/navigation';
import en from '@/dictionaries/en.json';
import sl from '@/dictionaries/sl.json';
import { defaultLocale, isLocale } from '@/i18n/config';

const messages = {
  en: en.notFound.message,
  sl: sl.notFound.message,
};

export default function NotFound() {
  const params = useParams<{ lang?: string }>();
  const lang = params?.lang && isLocale(params.lang) ? params.lang : defaultLocale;
  const message = messages[lang];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <p className="text-md text-center md:text-xl text-stone-200">{message}</p>
    </div>
  );
}
