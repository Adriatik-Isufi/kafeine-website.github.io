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
  basePath: '',                // Set if deploying to subdirectory (e.g., '/my-app')
  assetPrefix: '',             // Set if using CDN or custom domain
}

export default nextConfig
