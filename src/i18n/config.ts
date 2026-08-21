export const locales = ['sl', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'sl';

// Locale served when a request expresses no usable language preference. Browsers
// always send Accept-Language, so in practice this is the crawler/bot path — and
// it is what `hreflang="x-default"` points at, so the two must agree.
export const fallbackLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
