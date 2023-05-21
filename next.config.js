/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'preview.colorlib.com',
        port: '',
        pathname: '/theme/feliciano/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
