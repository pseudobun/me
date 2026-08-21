'use client';

import { useParams } from 'next/navigation';
import NotFoundContent from '@/components/NotFoundContent';
import en from '@/dictionaries/en.json';
import sl from '@/dictionaries/sl.json';
import { defaultLocale, isLocale } from '@/i18n/config';

const dictionaries = { en: en.notFound, sl: sl.notFound };

export default function NotFound() {
  const params = useParams<{ lang?: string }>();
  const lang = params?.lang && isLocale(params.lang) ? params.lang : defaultLocale;
  const copy = dictionaries[lang];

  return <NotFoundContent copy={copy} locale={lang} />;
}
