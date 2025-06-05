/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hirelatam.com',
      },
    ],
  },
}

module.exports = nextConfig 