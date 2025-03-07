
#---Stage 1: Build stage
FROM node:20 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

#---Stage 2: Runtime stage
FROM node:20

WORKDIR /app

# Copy necessary files from build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/entrypoint.sh ./entrypoint.sh

# Set permissions for entrypoint.sh
RUN chmod +x entrypoint.sh

# Run entrypoint.sh when the container starts
CMD ["./entrypoint.sh"]