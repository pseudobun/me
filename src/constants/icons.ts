import { siGithub, siKeybase, siX } from 'simple-icons';

// Pre-extract the brand icon SVGs for the Footer, a server component that
// renders each exactly once. Strip the <title> (we provide aria-labels instead).
// Icons rendered per-card live in @/components/BrandIcons as JSX instead, so
// they are not serialized into the RSC payload once per instance.
const stripTitle = (svg: string) => svg.replace(/<title>.*?<\/title>/, '');

export const githubIconSvg = stripTitle(siGithub.svg);
export const keybaseIconSvg = stripTitle(siKeybase.svg);
export const xIconSvg = stripTitle(siX.svg);
