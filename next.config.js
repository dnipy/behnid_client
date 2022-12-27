/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({dest : 'public',register : true})

const nextConfig = withPWA({
  
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
})

module.exports = nextConfig
