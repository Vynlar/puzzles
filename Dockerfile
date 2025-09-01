# Use an official Node.js image as the base
FROM node:22-slim AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use an official Nginx image as the base
FROM nginx:latest

# Copy the built application from the previous stage to the Nginx default public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Configure Nginx to work with a single page app
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default nginx config that conflicts with our custom config
RUN rm /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]