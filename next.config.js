/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'scontent.cdninstagram.com',
      'video.cdninstagram.com',
      'example.com',
      'scontent-gru1-2.cdninstagram.com',
      'scontent-gru1-1.cdninstagram.com',
    ],
  },
}

module.exports = nextConfig
