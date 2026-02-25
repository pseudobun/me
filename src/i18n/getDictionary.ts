import 'server-only';
import type { Locale } from './config';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((m) => m.default),
  sl: () => import('../dictionaries/sl.json').then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
