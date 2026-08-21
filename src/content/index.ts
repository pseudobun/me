import type { Locale } from '@/i18n/config';
import type { PageContent } from './blocks';
import { ABOUT_EN, CONTACT_EN, PRIVACY_EN } from './pages.en';
import { ABOUT_SL, CONTACT_SL, PRIVACY_SL } from './pages.sl';

export type ContentPage = 'about' | 'contact' | 'privacy';

export const CONTENT_PAGES: ContentPage[] = ['about', 'contact', 'privacy'];

const CONTENT: Record<Locale, Record<ContentPage, PageContent>> = {
  en: { about: ABOUT_EN, contact: CONTACT_EN, privacy: PRIVACY_EN },
  sl: { about: ABOUT_SL, contact: CONTACT_SL, privacy: PRIVACY_SL },
};

export function getPageContent(locale: Locale, page: ContentPage): PageContent {
  return CONTENT[locale][page];
}

export function isContentPage(value: string): value is ContentPage {
  return (CONTENT_PAGES as string[]).includes(value);
}

export * from './blocks';
