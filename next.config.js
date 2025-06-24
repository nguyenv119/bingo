/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/bingo' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/bingo/' : '',
}

module.exports = nextConfig 