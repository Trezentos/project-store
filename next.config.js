/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'scontent.cdninstagram.com',
      'video.cdninstagram.com',
      'example.com',
    ],
  },
}

module.exports = nextConfig
