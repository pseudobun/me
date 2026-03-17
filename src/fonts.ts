import localFont from 'next/font/local';

export const monoFont = localFont({
  display: 'swap',
  fallback: ['monospace'],
  preload: true,
  src: [
    {
      path: '../public/fonts/IBMPlexMono-Regular.ttf',
      style: 'normal',
      weight: '400',
    },
  ],
});
