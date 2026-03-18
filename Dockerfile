# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy source code
COPY . .

# Build the Next.js app for static export
RUN pnpm run build

# Install serve globally to serve static files
RUN npm install -g serve

# Create a non-root user and switch to it (SECURITY: Prevent privilege escalation)
# Do this AFTER build to avoid permission issues
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

USER nextjs

# Expose port 3000
EXPOSE 3000

# Serve the static files from the out directory
CMD ["serve", "-s", "out", "-l", "3000"]
