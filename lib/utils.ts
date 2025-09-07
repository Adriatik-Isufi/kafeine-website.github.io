import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get correct image paths for GitHub Pages deployment
export function getImagePath(path: string): string {
  // Only add basePath in production (GitHub Pages deployment)
  const isProduction = process.env.NODE_ENV === 'production'
  const basePath = '/kafeine-website.github.io'
  
  // In development, return the path as-is
  if (!isProduction) {
    return path
  }
  
  // In production, add basePath
  // If path already starts with basePath, return as is
  if (path.startsWith(basePath)) {
    return path
  }
  // If path starts with /, prepend basePath
  if (path.startsWith('/')) {
    return `${basePath}${path}`
  }
  // If path doesn't start with /, prepend basePath and /
  return `${basePath}/${path}`
}
