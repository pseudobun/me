export const locales = ['sl', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'sl';
