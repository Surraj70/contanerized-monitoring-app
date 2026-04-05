# Use official lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies first (layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy application source
COPY src/ ./src/

# Expose the app port
EXPOSE 3000

# Run the app
CMD ["node", "src/app.js"]
