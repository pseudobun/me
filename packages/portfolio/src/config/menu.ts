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
    href: 'https://mirror.xyz/0x32B1172E786a31A65b46710Cd946b2521e13ac96',
    external: true,
  },
];