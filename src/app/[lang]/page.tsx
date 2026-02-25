import DecryptedText from '@/components/DecryptedText';
import ExoticLink from '@/components/ExoticLink';
import { PERSONAL } from '@/constants/data.mjs';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);
  const d = dict.home;

  return (
    <div className="flex flex-col w-full md:max-w-[512px] max-w-[256px] items-start">
      <span className="text-2xl font-bold">{d.greeting}</span>
      <p className="text-lg">
        {d.bio.intro}{' '}
        <ExoticLink aria-label={d.ariaLabels.company} className="no-underline" href={PERSONAL.companyUrl}>
          <DecryptedText sequential={true} text={PERSONAL.company} animateOn="both" speed={60} />
        </ExoticLink>{' '}
        {d.bio.and}{' '}
        <ExoticLink
          aria-label={d.ariaLabels.company}
          blank
          className="no-underline"
          href={PERSONAL.company2Url}
        >
          <DecryptedText sequential={true} text={PERSONAL.company2} animateOn="both" speed={60} />
        </ExoticLink>{' '}
        {d.bio.as} {PERSONAL.position}. {d.bio.masterDegree}{' '}
        <ExoticLink blank className="no-underline" href={PERSONAL.universityUrl}>
          <DecryptedText
            sequential={true}
            text={d.bio.university}
            animateOn="both"
            speed={30}
            revealDirection="start"
          />
        </ExoticLink>
      </p>
    </div>
  );
}
