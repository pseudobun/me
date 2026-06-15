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
} from '@/constants/cv';
import { PERSONAL } from '@/constants/data.mjs';
import { getProjectGithubStats } from '@/lib/github-project-stats';

export const revalidate = 86400;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 border-b border-neutral-300 pb-1 mb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function CvPage() {
  const stats = await getProjectGithubStats();
  const nf = new Intl.NumberFormat('en-US');

  return (
    <main className="max-w-3xl p-6 md:p-12 text-left text-[16px] leading-7 [&_a]:text-[#1a3acc] [&_a]:underline [&_a:hover]:text-[#0b2099]">
      {/* Header */}
      <header className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{PERSONAL.fullName}</h1>
          <p className="mt-1 text-neutral-600">
            {CV_TITLE} · {CV_LOCATION}
          </p>
          <p className="mt-3 text-sm text-neutral-600">
            <a href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>
            {' · '}
            <a href={CV_PGP_URL} target="_blank" rel="noopener noreferrer">
              PGP key
            </a>
            {' · '}
            <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer">
              github.com/pseudobun
            </a>
            {' · '}
            <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/urbanvidovic
            </a>
          </p>
        </div>
        <Image
          src="/urban-vidovic.webp"
          alt={PERSONAL.fullName}
          width={112}
          height={112}
          className="h-28 w-28 shrink-0 rounded-md object-cover"
          priority
        />
      </header>

      {stats ? (
        <p className="mt-6 text-sm text-neutral-600">
          <strong className="font-semibold text-black">
            {nf.format(Math.max(0, stats.commits))}
          </strong>{' '}
          commits with{' '}
          <strong className="font-semibold text-emerald-700">
            +{nf.format(Math.max(0, stats.additions))}
          </strong>{' '}
          lines added and{' '}
          <strong className="font-semibold text-rose-700">
            -{nf.format(Math.max(0, stats.deletions))}
          </strong>{' '}
          lines removed across{' '}
          <strong className="font-semibold text-black">
            {nf.format(Math.max(0, stats.repos))}
          </strong>{' '}
          repos.
        </p>
      ) : null}

      <a
        href="/api/cv/"
        download="urban-vidovic-cv.pdf"
        className="mt-6 inline-block rounded-md border border-neutral-400 px-4 py-2 text-sm font-medium !text-black !no-underline transition-colors hover:!bg-black hover:!text-white"
      >
        Download PDF
      </a>

      <p className="mt-8 text-neutral-800">{CV_SUMMARY}</p>

      <Section title="Experience">
        <div className="space-y-5">
          {CV_EXPERIENCE.map((exp) => (
            <div key={`${exp.role}-${exp.org}`}>
              <div className="flex flex-col justify-between sm:flex-row sm:items-baseline sm:gap-4">
                <p>
                  <span className="font-semibold">{exp.role}</span>
                  <span className="text-neutral-600">
                    {' · '}
                    {exp.orgUrl ? (
                      <a href={exp.orgUrl} target="_blank" rel="noopener noreferrer">
                        {exp.org}
                      </a>
                    ) : (
                      exp.org
                    )}
                  </span>
                </p>
                <p className="shrink-0 text-sm text-neutral-500">{exp.period}</p>
              </div>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-neutral-800 marker:text-neutral-400">
                {exp.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Selected projects">
        <ul className="space-y-2">
          {CV_PROJECTS.map((p) => (
            <li key={p.id}>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="font-semibold">
                  {p.title}
                </a>
              ) : (
                <span className="font-semibold">{p.title}</span>
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
                <span className="font-semibold">{ed.degree}</span>
                <span className="text-neutral-600">
                  {' · '}
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
              <span className="font-semibold">{group.label}: </span>
              <span className="text-neutral-800">{group.items.join(', ')}</span>
            </p>
          ))}
        </div>
      </Section>

      <Section title="Languages">
        <p className="text-neutral-800">
          {CV_LANGUAGES.map((l) => `${l.name} (${l.level})`).join(' · ')}
        </p>
      </Section>
    </main>
  );
}
