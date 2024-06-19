export interface MenuInput {
  label: string;
  href: string;
  external?: boolean;
}
export const MENUS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about/',
  },
  {
    label: 'Projects',
    href: '/projects/',
  },
  {
    label: 'Gallery',
    href: '/gallery/',
  },
  {
    label: 'Blog',
    href: 'https://mirror.xyz/pseudobun.eth',
    external: true,
  },
];
