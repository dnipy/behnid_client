/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler : {
    // removeConsole: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}

module.exports = nextConfig
