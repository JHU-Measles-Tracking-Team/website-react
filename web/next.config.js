/** @type {import('next').NextConfig} */
const path = require("path");

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  basePath: isProd ? '/jhu-measles-tracker' : '',
  assetPrefix: isProd ? '/jhu-measles-tracker/' : '',
};

module.exports = nextConfig;
