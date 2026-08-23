import Link from 'next/link';

export interface NotFoundCopy {
  lead: string;
  title: string;
  where: string;
}

export const NOT_FOUND_COPY_EN: NotFoundCopy = {
  title: '404 — Page not found',
  lead: 'This URL does not exist. Nothing was moved; this path was never valid.',
  where: 'Where to go instead',
};

/**
 * Shared 404 body. Recovery links are rendered as real, visible links (not just
 * a message) so both people and agents can get somewhere useful. The
 * machine-readable indexes live in the Markdown variant of this page, which is
 * what an agent gets via `Accept: text/markdown` anyway.
 */
export default function NotFoundContent({
  copy,
  locale = 'en',
}: {
  copy: NotFoundCopy;
  locale?: string;
}) {
  const pages = [
    { href: `/${locale}/`, label: 'Home' },
    { href: `/${locale}/projects/`, label: 'Projects' },
    { href: `/${locale}/about/`, label: 'About' },
    { href: `/${locale}/contact/`, label: 'Contact' },
    { href: `/${locale}/privacy/`, label: 'Privacy' },
    { href: '/cv/', label: 'CV' },
  ];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col justify-center gap-8 py-12">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{copy.title}</h1>
        <p className="text-lg leading-8 text-muted-foreground">{copy.lead}</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight">{copy.where}</h2>
        <ul className="list-disc space-y-1 pl-6 text-lg text-muted-foreground">
          {pages.map((page) => (
            <li key={page.href}>
              <Link href={page.href} className="text-primary hover:text-primary/80">
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
