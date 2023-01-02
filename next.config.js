/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({dest : 'public',register : true})

const nextConfig = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'behnid.com',
        port: '443',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
    ],
  },
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
  },
  // output: 'standalone',
})

module.exports = nextConfig
