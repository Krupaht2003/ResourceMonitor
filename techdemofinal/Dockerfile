# Stage 1: Build the frontend using Bun and Vite
FROM oven/bun AS builder

WORKDIR /app

# Install dependencies and build the app
# COPY ./techdemofinal/package.json bun.lock ./
COPY package.json ./package.json
COPY bun.lock ./bun.lock
RUN bun install --frozen-lockfile

COPY . .  
RUN bun run build

# Stage 2: Serve using Nginx
FROM nginx:alpine AS runtime

WORKDIR /usr/share/nginx/html

# Copy built assets from builder stage
COPY --from=builder /app/dist .

# Copy custom Nginx configuration
COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
