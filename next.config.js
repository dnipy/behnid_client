/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest : 'public',
  register : true,
  // customWorkerDir: 'serviceworker'
})

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
      {
        protocol: 'https',
        hostname: 'api.behnid.com',
        port: '443',
        pathname: '/uploads/**',
      },
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
  compiler : {
    removeConsole: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  // output: 'standalone',
  compress: true,
  
})

module.exports = nextConfig
