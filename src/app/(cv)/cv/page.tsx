import Image from 'next/image';
import {
  CV_EDUCATION,
  CV_EXPERIENCE,
  CV_LANGUAGES,
  CV_LOCATION,
  CV_PGP_URL,
  CV_PROJECTS,
  CV_SKILLS,
  CV_SUMMARY,
  CV_TITLE,
  periodDuration,
} from '@/constants/cv';
import { PERSONAL } from '@/constants/data.mjs';
import { getProjectGithubStats } from '@/lib/github-project-stats';

// Must be a static literal (Next segment config); keep in sync with
// GITHUB_STATS_REVALIDATE_SECONDS in @/lib/github-project-stats.
export const revalidate = 86400;

function Sep() {
  return <span className="font-bold"> · </span>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 border-t-2 border-black pt-2">
      <h2 className="mb-3 text-base font-bold uppercase">{title}</h2>
      {children}
    </section>
  );
}

export default async function CvPage() {
  const stats = await getProjectGithubStats();
  const nf = new Intl.NumberFormat('en-US');

  return (
    <main className="max-w-3xl p-6 md:p-12 text-left text-[16px] leading-snug [&_a]:text-[#1a3acc] [&_a]:underline [&_a:hover]:text-[#0b2099]">
      {/* Header */}
      <header className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
            {PERSONAL.fullName}
          </h1>
          <p className="mt-2 font-bold">
            {CV_TITLE} · {CV_LOCATION}
          </p>
          <p className="mt-3 text-sm">
            <a href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>
            <Sep />
            <a
              href={CV_PGP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PGP public key (opens in a new tab)"
            >
              PGP key
            </a>
            <Sep />
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
            >
              github.com/pseudobun
            </a>
            <Sep />
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
            >
              linkedin.com/in/urbanvidovic
            </a>
          </p>
        </div>
        <Image
          src="/urban-vidovic.webp"
          alt={PERSONAL.fullName}
          width={112}
          height={112}
          className="h-28 w-28 shrink-0 rounded-full object-cover"
          priority
        />
      </header>

      {stats ? (
        <p className="mt-6 text-sm text-neutral-600">
          <strong className="font-semibold text-black">{nf.format(stats.commits)}</strong> commits
          with{' '}
          <strong className="font-semibold text-emerald-700">+{nf.format(stats.additions)}</strong>{' '}
          lines added and{' '}
          <strong className="font-semibold text-rose-700">-{nf.format(stats.deletions)}</strong>{' '}
          lines removed across{' '}
          <strong className="font-semibold text-black">{nf.format(stats.repos)}</strong> repos.
        </p>
      ) : null}

      <a
        href="/api/cv/"
        download="urban-vidovic-cv.pdf"
        className="mt-6 inline-block border border-black px-4 py-2 text-sm font-bold uppercase !text-black !no-underline transition-colors hover:!bg-black hover:!text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Download PDF
      </a>

      <p className="mt-8 text-neutral-800">{CV_SUMMARY}</p>

      <Section title="Experience">
        <div className="space-y-5">
          {CV_EXPERIENCE.map((exp) => {
            const dur = periodDuration(exp.period);
            return (
              <div key={`${exp.role}-${exp.org}`}>
                <div className="flex flex-col justify-between sm:flex-row sm:items-baseline sm:gap-4">
                  <p>
                    <span className="font-bold">{exp.role}</span>
                    <span className="text-neutral-600">
                      <Sep />
                      {exp.orgUrl ? (
                        <a href={exp.orgUrl} target="_blank" rel="noopener noreferrer">
                          {exp.org}
                        </a>
                      ) : (
                        exp.org
                      )}
                    </span>
                  </p>
                  <p className="shrink-0 text-sm text-neutral-500">
                    {exp.period}
                    {dur ? ` · ${dur}` : ''}
                  </p>
                </div>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-neutral-800 marker:text-neutral-400">
                  {exp.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Selected projects">
        <ul className="space-y-2">
          {CV_PROJECTS.map((p) => (
            <li key={p.id}>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="font-bold">
                  {p.title}
                </a>
              ) : (
                <span className="font-bold">{p.title}</span>
              )}
              <span className="text-neutral-600"> — {p.org}.</span>{' '}
              <span className="text-neutral-700">{p.description}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Education">
        <div className="space-y-3">
          {CV_EDUCATION.map((ed) => (
            <div
              key={ed.degree}
              className="flex flex-col justify-between sm:flex-row sm:items-baseline sm:gap-4"
            >
              <p>
                <span className="font-bold">{ed.degree}</span>
                <span className="text-neutral-600">
                  <Sep />
                  {ed.schoolUrl ? (
                    <a href={ed.schoolUrl} target="_blank" rel="noopener noreferrer">
                      {ed.school}
                    </a>
                  ) : (
                    ed.school
                  )}
                </span>
              </p>
              <p className="shrink-0 text-sm text-neutral-500">{ed.period}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <div className="space-y-1">
          {CV_SKILLS.map((group) => (
            <p key={group.label}>
              <span className="font-bold">{group.label}: </span>
              <span className="text-neutral-800">{group.items.join(', ')}</span>
            </p>
          ))}
        </div>
      </Section>

      <Section title="Languages">
        <p className="text-neutral-800">
          {CV_LANGUAGES.map((l, i) => (
            <span key={l.name}>
              {i > 0 ? <Sep /> : null}
              {l.name} ({l.level})
            </span>
          ))}
        </p>
      </Section>
    </main>
  );
}
