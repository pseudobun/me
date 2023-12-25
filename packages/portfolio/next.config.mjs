/** @type {import('next').NextConfig} */
import StylelintPlugin from 'stylelint-webpack-plugin';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.plugins.push(new StylelintPlugin());
    const experiments = config.experiments || {};
    config.experiments = {
      ...experiments,
      asyncWebAssembly: true,
    };
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
