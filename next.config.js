/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest : 'public',
  register : true,
  // customWorkerDir: 'serviceworker'
})

const nextConfig = withPWA({
  images : {
    domains : [
      'api.behnid.com',
      'behnid.com'
    ]
  },
  reactStrictMode: false,
  swcMinify: true,
  compiler : {
    removeConsole: false,
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
