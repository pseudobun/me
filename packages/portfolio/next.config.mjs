/** @type {import('next').NextConfig} */
import MillionCompiler from '@million/lint';
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: { optimizeCss: true },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chojcamcqydloijjypzf.supabase.co',
        pathname: '/storage/v1/object/public/images/**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default MillionCompiler.next({
  rsc: true,
})(nextConfig);
