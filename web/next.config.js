/** @type {import('next').NextConfig} */
const path = require("path");

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  basePath: isProd ? '/website-react' : '',
  assetPrefix: isProd ? '/website-react/' : '',
};

module.exports = nextConfig;
