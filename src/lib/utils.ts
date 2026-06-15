import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safe keyed lookup for objects indexed by a runtime string (e.g. i18n
 * dictionary entries keyed by project id). Avoids unsafe `as keyof` casts.
 */
export function lookup<T>(record: Record<string, T>, key: string): T | undefined {
  return record[key];
}
