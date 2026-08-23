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
    // The largest image this site ever displays is the screenshot modal, capped
    // at 84vh. The default ladder runs to 3840w, which made every card's srcSet
    // ~800 B and — worse — set the no-srcSet fallback `src` to a 3840w render
    // for a thumbnail in a 192px-tall box.
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [256, 384],
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
