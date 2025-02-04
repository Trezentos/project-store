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
      'scontent-gru2-2.cdninstagram.com',
      'scontent-gru2-1.cdninstagram.com',
      'store-project-commerce.s3.amazonaws.com',
      's3.console.aws.amazon.com',
    ],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
}

module.exports = nextConfig
