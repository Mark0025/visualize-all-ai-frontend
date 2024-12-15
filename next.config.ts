import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  
  // Enable image optimization
  images: {
    domains: [
      'lh3.googleusercontent.com', // For Google profile pictures
      'aireinvestor.com',
    ],
  },

  // Environment variables available on the client
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },

  // Production settings
  productionBrowserSourceMaps: true, // Enable source maps in production
  poweredByHeader: false, // Remove X-Powered-By header
  
  // Enable React strict mode
  reactStrictMode: true,
};

export default nextConfig;
