const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  // Bundle the fonts + photo the /api/cv PDF route reads from disk at runtime.
  outputFileTracingIncludes: {
    '/api/cv': [
      './public/fonts/IBMPlexMono-PDF-Regular.ttf',
      './public/fonts/IBMPlexMono-PDF-Bold.ttf',
      './public/urban-vidovic.jpg',
    ],
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
