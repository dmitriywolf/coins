/** @type {import('next').NextConfig} */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev`
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';

  const env = {
    API_URL_COMPARE: 'https://min-api.cryptocompare.com/data',
    COMPARE_LINK: 'https://www.cryptocompare.com',
    // for example
    API_URL_CRYPTO: (() => {
      if (isDev) return 'https://api.coingecko.com/api/v3/';
      if (isProd) return 'https://api.coingecko.com/api/v3/';
    })(),
    NEXT_PUBLIC_DOMAIN: (() => {
      if (isDev) return 'http://localhost:3000';
      if (isProd) return 'https://crypto-coins-compare.vercel.app';
    })(),
  };

  // next.config.js object
  return {
    env,
    reactStrictMode: true,
    swcMinify: true,
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
};
