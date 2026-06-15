const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  // Bundle the fonts/assets the /api routes read from disk at runtime (Next's
  // file tracing does not follow dynamic process.cwd() path joins).
  outputFileTracingIncludes: {
    '/api/cv': [
      './public/fonts/IBMPlexMono-PDF-Regular.ttf',
      './public/fonts/IBMPlexMono-PDF-Bold.ttf',
      './public/urban-vidovic.jpg',
    ],
    '/api/og': ['./public/fonts/IBMPlexMono-Regular.ttf', './public/dark-logo.svg'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chojcamcqydloijjypzf.supabase.co',
        pathname: '/storage/v1/object/public/images/**',
      },
    ],
  },
};

export default nextConfig;
