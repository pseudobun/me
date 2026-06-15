import { siAppstore, siGithub, siKeybase, siX } from 'simple-icons';

// Pre-extract the brand icon SVGs in a server module so `simple-icons` never
// reaches the client bundle. Strip the <title> (we provide aria-labels instead).
const stripTitle = (svg: string) => svg.replace(/<title>.*?<\/title>/, '');

export const githubIconSvg = stripTitle(siGithub.svg);
export const appStoreIconSvg = stripTitle(siAppstore.svg);
export const keybaseIconSvg = stripTitle(siKeybase.svg);
export const xIconSvg = stripTitle(siX.svg);
