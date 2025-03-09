import type { NextConfig } from "next";

// Security headers that apply to virtually all web applications
// Updated with modern security headers recommended for Next.js 15
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://*.vercel-insights.com",
  },
];

const nextConfig: NextConfig = {
  // Image optimization - updated for Next.js 15
  images: {
    formats: ['image/webp', 'image/avif'], // Modern image formats
    remotePatterns: [
      // Uncomment and modify as needed for your external image sources
      /*
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      },
      */
    ],
  },
  
  // Security headers - best practices for all web applications
  headers: async () => [
    {
      source: '/:path*',
      headers: securityHeaders,
    },
  ],
  
  // Performance optimizations - Next.js 15 best practices
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Output configuration - static exports if needed
  // output: 'standalone', // Uncomment for self-hosted environments
  
  // Middleware matcher - helps optimize middleware execution
  // Uncomment and customize if you're using middleware
  /*
  experimental: {
    optimisticClientCache: true,
    middlewareMatcher: {
      // Define paths that should trigger middleware
      matcherPath: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
    },
  },
  */
  
  /* 
   * Additional configuration options below are commented out as examples
   * Developers can uncomment and customize these as needed for their specific applications
   */

  // Internationalization - updated for Next.js 15
  /*
  i18n: {
    locales: ['en', 'fr', 'de', 'es'],
    defaultLocale: 'en',
  },
  */

  // URL handling - provide examples but app-specific implementation
  /*
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true, // 308 status code
      },
    ];
  },
  
  async rewrites() {
    return {
      beforeFiles: [
        // Example: Proxy API requests to hide backend services
        {
          source: '/api/proxy/:path*',
          destination: 'https://api.external-service.com/:path*',
        },
      ],
    };
  },
  */
  
  // Next.js 15 optimizations
  compiler: {
    // Enable React server components optimizations
    emotion: false, // Set to true if using emotion
    styledComponents: false, // Set to true if using styled-components
    removeConsole: process.env.NODE_ENV === 'production', // Remove console in production
  },
};

export default nextConfig;
