import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get correct image paths
export function getImagePath(path: string): string {
  // With custom domain setup, no basePath needed
  // Simply return the path as-is
  return path
}
