# Universal Next.js Static Deployment Blueprint

This document provides a comprehensive guide to set up a Next.js project with static export, Docker containerization, and GitHub Pages deployment. Follow this blueprint to create a production-ready setup with all configurations, build processes, and deployment pipelines.

When applying to a new project, give Cursor this prompt:
I'm using this deployment blueprint. Please:
1. Replace [PROJECT-NAME] with "my-actual-project-name"
2. Replace port 3000/3001 if needed
3. Implement all configurations exactly as specified
4. Create all files with the exact content shown

## Table of Contents

1. [Quick Start Checklist](#quick-start-checklist)
2. [Project Overview](#project-overview)
3. [Prerequisites](#prerequisites)
4. [Project Structure](#project-structure)
5. [Local Development Setup](#local-development-setup)
6. [Configuration Files](#configuration-files)
7. [Docker Configuration](#docker-configuration)
8. [GitHub Pages Deployment](#github-pages-deployment)
9. [CI/CD Pipeline Setup](#cicd-pipeline-setup)
10. [Build Process](#build-process)
11. [Troubleshooting](#troubleshooting)
12. [Project Customization Guide](#project-customization-guide)

## Quick Start Checklist

- [ ] Install Node.js 18+ and pnpm
- [ ] Clone repository and install dependencies
- [ ] Copy all configuration files from this blueprint
- [ ] Set up GitHub repository
- [ ] Configure GitHub Actions workflow
- [ ] Enable GitHub Pages
- [ ] Test local development and production builds
- [ ] Verify Docker containers work
- [ ] Deploy and test live site

## Project Overview

**Technology Stack:**
- **Framework:** Next.js 14.2.16 with TypeScript
- **Package Manager:** pnpm (recommended) or npm
- **Styling:** Tailwind CSS with shadcn/ui components
- **Build Output:** Static export (SSG)
- **Deployment:** GitHub Pages
- **Containerization:** Docker with multi-environment support

**Architecture:**
- Static site generation for optimal performance
- No server-side rendering (purely static)
- Docker containers for development and production
- Automated deployment via GitHub Actions

**⚠️ Important Limitations:**
This blueprint is for **static export only** and does NOT support:
- API routes (`/api/*` endpoints)
- Dynamic routes without `generateStaticParams`
- Server-side rendering (SSR)
- Middleware
- Authentication that requires server-side sessions

## Prerequisites

### System Requirements
- **Node.js:** Version 18 or higher
- **Package Manager:** pnpm (recommended) or npm
- **Docker:** Latest version for containerization
- **Git:** For version control
- **GitHub Account:** For repository hosting and Pages deployment

### Installation Commands
```bash
# Install Node.js (via nvm recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
nvm install 18
nvm use 18

# Install pnpm globally
npm install -g pnpm

# Install Docker
# Follow official Docker installation guide for your OS
```

## Project Structure

```
[PROJECT-ROOT]/
├── app/                          # Next.js 13+ app directory
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── [other-pages]/           # Additional pages
│       └── page.tsx
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── textarea.tsx
│   └── [custom-components].tsx  # Your custom components
├── lib/                         # Utility functions
│   └── utils.ts
├── public/                      # Static assets
│   ├── images/
│   └── icons/
├── out/                         # Build output (generated)
├── .github/                     # GitHub workflows
│   └── workflows/
│       └── deploy.yml
├── .gitignore                   # Git ignore rules
├── .dockerignore               # Docker ignore rules
├── components.json             # shadcn/ui configuration
├── docker-compose.yml          # Docker Compose configuration
├── Dockerfile                  # Production Docker image
├── Dockerfile.dev             # Development Docker image
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies and scripts
├── postcss.config.mjs         # PostCSS configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## Local Development Setup

### 1. Initialize Project

```bash
# Create new project directory
mkdir [PROJECT-NAME]
cd [PROJECT-NAME]

# Initialize git repository
git init
```

### 2. Package Configuration

**File: `package.json`**
```json
{
  "name": "[PROJECT-NAME]",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "next build",
    "export": "next build && next export",
    "deploy": "npm run export && touch out/.nojekyll",
    "dev": "next dev",
    "lint": "next lint",
    "start": "next start",
    "docker:build": "docker build -t [PROJECT-NAME] .",
    "docker:run": "docker run -p 3000:3000 [PROJECT-NAME]",
    "docker:dev": "docker compose up dev -d",
    "docker:prod": "docker compose up app -d",
    "docker:stop": "docker compose down",
    "docker:logs": "docker compose logs -f"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.1",
    "@radix-ui/react-dialog": "1.1.4",
    "@radix-ui/react-dropdown-menu": "2.1.4",
    "@radix-ui/react-label": "2.1.1",
    "@radix-ui/react-select": "2.1.4",
    "@radix-ui/react-slot": "1.1.1",
    "@radix-ui/react-toast": "1.2.4",
    "autoprefixer": "^10.4.20",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.454.0",
    "next": "14.2.16",
    "next-themes": "^0.4.4",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.54.1",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8.5",
    "tailwindcss": "^3.4.17",
    "typescript": "^5"
  }
}
```

**Note:** Add additional dependencies as needed for your specific project. The above includes only essential packages.

### 3. Install Dependencies

```bash
# Install all dependencies
pnpm install

# Or with npm
npm install
```

### 4. Development Server

```bash
# Start development server
pnpm dev

# Opens on http://localhost:3000
```

## Configuration Files

### Next.js Configuration

**File: `next.config.mjs`**
```javascript
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
  basePath: process.env.NODE_ENV === 'production' ? '/[REPO-NAME]' : '',  // Environment-aware basePath
  assetPrefix: process.env.NODE_ENV === 'production' ? '/[REPO-NAME]/' : '', // Environment-aware assetPrefix
}

export default nextConfig
```

**Key Configuration Explanations:**
- `output: 'export'`: Enables static site generation (REQUIRED)
- `images: { unoptimized: true }`: Required for static export
- `trailingSlash: true`: Ensures proper routing in static hosting
- `basePath`: **Environment-aware** - empty in development, `/repository-name` in production
- `assetPrefix`: **Environment-aware** - empty in development, `/repository-name/` in production
- Build and type checking errors are ignored for flexible deployment (set to false for stricter builds)

**🚨 Critical for Multi-Repository GitHub Pages:**
If you have multiple repositories with GitHub Pages (e.g., one with custom domain), use the environment-aware configuration above. This ensures:
- **Development**: Works at `http://localhost:3000/` (no basePath issues)
- **Production**: Works at `username.github.io/repository-name/` (correct subdirectory)

### TypeScript Configuration

**File: `tsconfig.json`**
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "target": "ES6",
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Tailwind CSS Configuration

**File: `tailwind.config.ts`**
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
```

### PostCSS Configuration

**File: `postcss.config.mjs`**
```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},  // Use @tailwindcss/postcss for Tailwind CSS v4+
  },
}

export default config
```

**⚠️ Important for Tailwind CSS v4+:**
If your project uses Tailwind CSS v4 or higher, you MUST use `@tailwindcss/postcss` instead of `tailwindcss` in the PostCSS configuration. Check your `package.json` for the Tailwind version:
- **v3.x**: Use `tailwindcss: {}`
- **v4.x+**: Use `@tailwindcss/postcss: {}`

### shadcn/ui Configuration

**File: `components.json`**
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

### Image Path Utility (Multi-Environment Support)

**File: `lib/utils.ts`** (Add to existing utils file)
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get correct image paths for GitHub Pages deployment
export function getImagePath(path: string): string {
  // Only add basePath in production (GitHub Pages deployment)
  const isProduction = process.env.NODE_ENV === 'production'
  const basePath = '/[REPO-NAME]'  // Replace with your repository name
  
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
```

**Usage in Components:**
```tsx
import { getImagePath } from "@/lib/utils"

// Instead of:
<img src="/images/logo.png" alt="Logo" />

// Use:
<img src={getImagePath("/images/logo.png")} alt="Logo" />

// For background images:
<div style={{ backgroundImage: `url(${getImagePath("/images/hero.jpg")})` }} />
```

**Why This is Needed:**
Images in the `public` folder don't automatically respect the `basePath` configuration. This utility ensures:
- **Development**: Images load from `/images/logo.png`
- **Production**: Images load from `/repository-name/images/logo.png`

### Git Configuration

**File: `.gitignore`**
```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
.env*.local
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
*.swp
*.swo
```

## Docker Configuration

### Production Dockerfile

**File: `Dockerfile`**
```dockerfile
# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies (use frozen lockfile in production)
RUN pnpm install --frozen-lockfile || pnpm install --no-frozen-lockfile

# Copy source code
COPY . .

# Build the Next.js app for static export
RUN pnpm run build

# Install serve globally to serve static files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Serve the static files from the out directory
CMD ["serve", "-s", "out", "-l", "3000"]
```

### Development Dockerfile

**File: `Dockerfile.dev`**
```dockerfile
# Development Dockerfile for hot reload
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Expose port 3000
EXPOSE 3000

# Start development server
CMD ["pnpm", "dev"]
```

### Docker Compose Configuration

**File: `docker-compose.yml`**
```yaml
version: '3.8'

services:
  # Production-like build (serves static files)
  app:
    container_name: ${PROJECT_NAME:-app}-prod
    build: .
    ports:
      - "${PROD_PORT:-3000}:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  # Development with hot reload
  dev:
    container_name: ${PROJECT_NAME:-app}-dev
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "${DEV_PORT:-3001}:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    command: pnpm dev
    restart: unless-stopped
```

### Docker Environment Configuration (Optional)

**File: `.env.docker`**
```bash
# Docker configuration
PROJECT_NAME=[YOUR-PROJECT-NAME]
PROD_PORT=3000
DEV_PORT=3001
```

### Docker Ignore Configuration

**File: `.dockerignore`**
```
# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Next.js
.next
out

# Production
build
dist

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Local env files
.env*.local
.env.local
.env.development.local
.env.test.local
.env.production.local

# Version control
.git
.gitignore

# Documentation
README.md
*.md

# Docker
Dockerfile*
docker-compose.yml
.dockerignore

# IDE
.vscode
.idea
*.swp
*.swo

# OS
Thumbs.db
```

### Docker Usage Commands

```bash
# Build and run production container
pnpm run docker:build
pnpm run docker:run

# Or use Docker Compose
pnpm run docker:prod     # Production build
pnpm run docker:dev      # Development with hot reload
pnpm run docker:stop     # Stop all containers
pnpm run docker:logs     # View logs

# Manual Docker commands
docker build -t [PROJECT-NAME] .
docker run -p 3000:3000 [PROJECT-NAME]

# With environment file
docker compose --env-file .env.docker up app -d
```

## GitHub Pages Deployment

### Multi-Repository GitHub Pages Setup

**⚠️ Important for Multiple Repositories:**
If you have multiple GitHub repositories with Pages enabled (especially with custom domains), you may encounter conflicts. This blueprint handles this scenario with environment-aware configurations.

**Common Scenarios:**
1. **Primary repository** with custom domain (e.g., `username.github.io` → `example.com`)
2. **Secondary repository** for subdirectory deployment (e.g., `project-name.github.io` → `username.github.io/project-name/`)

**Configuration Requirements:**
- Use environment-aware `basePath` and `assetPrefix` in `next.config.mjs`
- Use `getImagePath` utility for all image references
- Ensure no CNAME file conflicts between repositories

### Static Export Process

The project uses Next.js static export to generate a complete static website:

1. **Build Command:** `next build` compiles the application
2. **Static Generation:** Files are exported to the `out` directory
3. **GitHub Pages:** Serves static files directly from the `out` directory

### Build Output Structure

```
out/
├── _next/
│   ├── static/
│   │   ├── chunks/        # JavaScript bundles
│   │   ├── css/          # Compiled CSS
│   │   └── media/        # Font files and assets
│   └── [build-id]/       # Build-specific assets
├── index.html            # Home page
├── 404.html             # Error page
├── [images and assets]   # Static assets from public/
└── [other pages]/       # Generated static pages
    └── index.html       # Each route as index.html
```

### Manual Deployment Process

```bash
# Build static export
pnpm run build

# The out directory now contains your static site
# Upload the contents of out/ to any static hosting service
```

## CI/CD Pipeline Setup

### GitHub Actions Workflow (Recommended)

**File: `.github/workflows/deploy.yml`**
```yaml
name: Deploy to GitHub Pages

on:
  # Runs on pushes to main branch
  push:
    branches: ["main"]
    
  # Allows manual trigger from Actions tab
  workflow_dispatch:

# Sets permissions for GITHUB_TOKEN
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one deployment at a time
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 8
          run_install: false
          
      - name: Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV
          
      - name: Setup pnpm cache
        uses: actions/cache@v4
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-
            
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build with Next.js
        run: pnpm run build
        
      - name: Create .nojekyll file
        run: touch ./out/.nojekyll
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Alternative: Simple Workflow (Legacy)

**File: `.github/workflows/deploy-simple.yml`**
```yaml
name: Deploy to GitHub Pages (Simple)

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Setup pnpm
      uses: pnpm/action-setup@v3
      with:
        version: 8
        
    - name: Install dependencies
      run: pnpm install --frozen-lockfile
      
    - name: Build application
      run: pnpm run build
      
    - name: Create .nojekyll file
      run: touch out/.nojekyll
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
        # cname: example.com  # Uncomment if using custom domain
```

### Setting Up GitHub Pages

1. **Repository Settings:**
   ```
   Repository → Settings → Pages
   Source: Deploy from a branch
   Branch: gh-pages / (root)
   ```

2. **Enable GitHub Actions:**
   ```
   Repository → Settings → Actions → General
   Workflow permissions: Read and write permissions
   Allow GitHub Actions to create and approve pull requests: ✓
   ```

3. **Custom Domain (Optional):**
   - Add CNAME file to public directory with your domain
   - Configure DNS settings:
     - A records: 185.199.108-111.153
     - CNAME: [username].github.io
   - Enable HTTPS in repository settings

### Environment Variables and Secrets

For external services (analytics, APIs, etc.):

**In GitHub:**
```
Repository → Settings → Secrets and variables → Actions → New repository secret
```

**In workflow:**
```yaml
- name: Build application
  run: pnpm run build
  env:
    NEXT_PUBLIC_API_KEY: ${{ secrets.API_KEY }}
    NEXT_PUBLIC_SITE_URL: ${{ vars.SITE_URL }}
```

**In code:**
```typescript
// Access public environment variables
const apiKey = process.env.NEXT_PUBLIC_API_KEY
```

## Build Process

### Static Export Deep Dive

**How Next.js Static Export Works:**

1. **Pre-rendering:** All pages are rendered at build time
2. **Asset Optimization:** Images, CSS, and JavaScript are optimized
3. **Route Generation:** Static HTML files created for each route
4. **Asset Bundling:** All assets are fingerprinted and optimized

### Build Commands Explained

```bash
# Standard Next.js build (creates .next directory and out directory)
pnpm run build

# Legacy export command (for older Next.js versions)
pnpm run export

# Combined build with GitHub Pages preparation
pnpm run deploy
```

### Build Optimization Settings

In `next.config.mjs`:
- `images: { unoptimized: true }` - Required for static export
- `output: 'export'` - Enables static HTML export
- `trailingSlash: true` - Ensures proper routing for static hosting

### Asset Handling

- **Images:** Place in `public/` directory, reference with `/image.jpg`
- **Fonts:** Use Next.js font optimization or load from public
- **CSS:** Compiled and optimized automatically
- **JavaScript:** Bundled and split for optimal loading

### Dynamic Routes with Static Export

For dynamic routes, you must define all possible paths:

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  return [
    { slug: 'post-1' },
    { slug: 'post-2' },
    { slug: 'post-3' },
  ]
}
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Build Failures

**Problem:** Build fails with TypeScript errors
```bash
Type error: Property 'X' does not exist on type 'Y'
```

**Solution:**
```javascript
// In next.config.mjs, temporarily set:
typescript: {
  ignoreBuildErrors: true,
}
// Fix types later for production
```

#### 2. Docker Build Issues

**Problem:** Docker build fails with permission errors
```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Or run with sudo
sudo docker build -t [PROJECT-NAME] .
```

**Problem:** pnpm not found in container
```dockerfile
# Ensure pnpm is installed in Dockerfile
RUN npm install -g pnpm
```

#### 3. GitHub Pages Deployment

**Problem:** 404 errors on all pages except home
**Solution:** Ensure `trailingSlash: true` in `next.config.mjs`

**Problem:** Assets not loading (404 errors)
**Solution:** 
```javascript
// For subdirectory deployment (e.g., username.github.io/repo-name)
const nextConfig = {
  basePath: '/repo-name',
  assetPrefix: '/repo-name/',
}
```

**Problem:** Pages not updating after deployment
**Solution:** 
- Clear browser cache
- Check GitHub Pages settings
- Verify workflow completed successfully
- Add cache busting: `?v=${Date.now()}` to asset URLs

#### 4. Local Development Issues

**Problem:** Hot reload not working in Docker
**Solution:** Check volume mounts in `docker-compose.yml`
```yaml
volumes:
  - .:/app
  - /app/node_modules  # Prevents node_modules override
  - /app/.next        # Prevents .next override
```

**Problem:** Port already in use
```bash
# Find process using port
lsof -i :3000
# Kill process
kill -9 [PID]
# Or use different port
PORT=3001 pnpm dev
```

#### 5. Static Export Issues

**Problem:** "Error: Page ... cannot be exported with `output: export`"
**Solution:** Remove or refactor:
- API routes (`app/api/*`)
- Dynamic routes without `generateStaticParams`
- Server components with dynamic data fetching

#### 6. Tailwind CSS v4 Compilation Errors

**Problem:** 
```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. 
The PostCSS plugin has moved to a separate package...
```

**Solution:** Update `postcss.config.mjs`:
```javascript
// For Tailwind CSS v4+
const config = {
  plugins: {
    '@tailwindcss/postcss': {},  // Not 'tailwindcss': {}
  },
}
```

#### 7. Component Props Runtime Errors

**Problem:** 
```
TypeError: Cannot read properties of undefined (reading 'home')
TypeError: Cannot read properties of undefined (reading 'description')
```

**Solution:** Make component props optional with defaults:
```tsx
// Before
interface NavigationProps {
  language: "sq" | "en"
  onLanguageChange: (lang: "sq" | "en") => void
}

// After
interface NavigationProps {
  language?: "sq" | "en"
  onLanguageChange?: (lang: "sq" | "en") => void
}

function Navigation({ language = "sq", onLanguageChange }: NavigationProps) {
  // Component can now be called without props: <Navigation />
}
```

#### 8. Multi-Repository GitHub Pages Issues

**Problem:** Site loads but images/assets return 404 errors, or development server shows 404
**Root Cause:** Conflicts between multiple GitHub Pages repositories or custom domains

**Solution:** Use environment-aware configuration:
1. **Update `next.config.mjs`** with environment-aware basePath
2. **Create `getImagePath` utility** for images
3. **Check GitHub Pages settings** - ensure no conflicting custom domains

**Diagnostic Steps:**
```bash
# Check if basePath is causing dev server issues
pnpm dev  # Should work at http://localhost:3000/

# Check if images load in dev vs production
console.log(process.env.NODE_ENV)  # 'development' vs 'production'
```

**Problem:** Images not working
**Solution:** 
```jsx
// Use unoptimized images for static export
import Image from 'next/image'

<Image 
  src="/image.jpg" 
  alt="Description"
  width={500}
  height={300}
  unoptimized={true}
/>
```

### Debug Commands

```bash
# Check build output
ls -la out/

# Verify static files locally
npx serve -s out -l 3000

# Check Docker logs
docker logs [container-id]

# Test production build locally
pnpm run build && pnpm start

# Analyze bundle size
ANALYZE=true pnpm run build

# Check for build errors
pnpm run build --debug
```

### Performance Optimization

1. **Image Optimization:**
   - Pre-optimize images before adding to `public/`
   - Use WebP format when possible
   - Implement lazy loading

2. **Bundle Analysis:**
   ```bash
   # Install bundle analyzer
   pnpm add -D @next/bundle-analyzer
   
   # Add to next.config.mjs
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   })
   module.exports = withBundleAnalyzer(nextConfig)
   
   # Run analysis
   ANALYZE=true pnpm run build
   ```

3. **Lighthouse Testing:**
   ```bash
   # Test performance
   npx lighthouse http://localhost:3000 --view
   ```

## Project Customization Guide

### Required Replacements

When using this blueprint for your project, replace these placeholders:

1. **[PROJECT-NAME]** - Your project name (lowercase, hyphens for spaces)
2. **[YOUR-PROJECT-NAME]** - Your project display name
3. **[REPO-NAME]** - Your repository name (in `basePath` and `getImagePath`)
4. **Port numbers** - Change if defaults (3000, 3001) are in use

**🚨 Critical Replacements for Multi-Repository Setup:**
```javascript
// In next.config.mjs
basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',

// In lib/utils.ts
const basePath = '/your-repo-name'  // Replace with actual repository name
```

### Optional Customizations

1. **Remove unused dependencies** from `package.json`
2. **Adjust TypeScript strictness** in `tsconfig.json`
3. **Modify Docker ports** in `docker-compose.yml`
4. **Add custom domain** in GitHub Actions workflow
5. **Configure analytics** or other third-party services

### Validation Steps

After implementing this blueprint:

```bash
# 1. Verify installation
pnpm install

# 2. Test development server
pnpm dev

# 3. Test production build
pnpm run build

# 4. Verify static output
ls -la out/

# 5. Test static server
npx serve -s out -l 3000

# 6. Test Docker build
docker build -t test .

# 7. Test Docker run
docker run -p 3000:3000 test

# 8. Push to GitHub and verify Actions run
git push origin main
```

## Final Deployment Checklist

- [ ] All placeholders replaced with actual values
- [ ] Dependencies installed successfully (`pnpm install`)
- [ ] Local development server working (`pnpm dev`)
- [ ] Production build successful (`pnpm run build`)
- [ ] Static files generated in `out/` directory
- [ ] Docker containers building without errors
- [ ] Docker containers running successfully
- [ ] GitHub repository created and code pushed
- [ ] GitHub Actions workflow added and enabled
- [ ] GitHub Pages enabled in repository settings
- [ ] First deployment successful
- [ ] Site accessible at GitHub Pages URL
- [ ] Custom domain configured (if applicable)
- [ ] SSL/HTTPS working
- [ ] All pages loading correctly
- [ ] Assets (images, CSS, JS) loading properly
- [ ] Performance acceptable (Lighthouse score >90)
- [ ] SEO meta tags configured
- [ ] Analytics implemented (if needed)
- [ ] Error tracking set up (if needed)

## Quick Reference Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm start                  # Start production server

# Docker
pnpm run docker:dev         # Start dev container
pnpm run docker:prod        # Start prod container
pnpm run docker:stop        # Stop all containers
pnpm run docker:logs        # View container logs

# Deployment
git push origin main        # Trigger GitHub Pages deployment

# Troubleshooting
rm -rf .next out            # Clean build directories
rm -rf node_modules         # Clean dependencies
pnpm install               # Reinstall dependencies
```

## Additional Resources

- [Next.js Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [pnpm Documentation](https://pnpm.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

---

This blueprint provides everything needed to set up a production-ready Next.js static site with Docker containerization and automated GitHub Pages deployment. Follow the sections in order for a smooth setup process.