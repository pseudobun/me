/** @type {import('next').NextConfig} */
const StylelintPlugin = require("stylelint-webpack-plugin");

const nextConfig = {
  experimental: {
    appDir: true,
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
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
