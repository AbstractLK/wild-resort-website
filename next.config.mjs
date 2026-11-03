/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["mysql2"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rptcjwswyjzysxhdjnwm.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
