/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // Set to false for strict builds
  },
  typescript: {
    ignoreBuildErrors: true,   // Set to false for strict builds
  },
  images: {
    unoptimized: true,         // Required for static export
  },
  output: 'export',            // Enable static export
  trailingSlash: true,         // Add trailing slashes to routes
  basePath: process.env.NODE_ENV === 'production' ? '/kafeine-website.github.io' : '',  // Only in production
  assetPrefix: process.env.NODE_ENV === 'production' ? '/kafeine-website.github.io/' : '', // Only in production
}

export default nextConfig
