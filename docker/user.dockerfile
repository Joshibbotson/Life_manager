# Stage 1: Base Node.js image to build the Angular app
FROM node:16 AS build

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the Angular app (replace 'your-angular-app' with your actual app name)
RUN npm run build -- --prod --output-path=dist/Life_manager

# Stage 2: Use a lightweight web server to serve the built Angular app
FROM nginx:latest

# Copy the built Angular app from the build stage to Nginx server directory
COPY --from=build /app/dist/your-angular-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Nginx is started automatically by the base image
