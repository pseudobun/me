import { cookies } from 'next/headers';
import { defaultLocale, type Locale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

export default async function NotFound() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('NEXT_LOCALE')?.value as Locale) ?? defaultLocale;
  const locale = locales.includes(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <p className="text-md text-center md:text-xl text-stone-200">{dict.notFound.message}</p>
    </div>
  );
}
