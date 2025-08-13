/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'wild-resort-s3.s3.eu-north-1.amazonaws.com',
            port: '',
            pathname: '/cabin-images/**',
            search: '',
          },
        ],
      },
      // output: "export"
};

export default nextConfig;