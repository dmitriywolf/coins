/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    COMPARE_API_KEY:
      '07f3b99c7a45c04c62ed73fee50d8bbe1595d38e16b1ba2970a96f1cfc1a4e1b',
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.inline\.svg$/i,
      use: ['url-loader'],
    });
    config.module.rules.push({
      test: /^((?!inline).)*\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
