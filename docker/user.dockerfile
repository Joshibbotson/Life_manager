# Stage 1: Base Node.js image to build the Angular app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY ./user/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY ./user/ .

# Build the Angular app (replace 'your-angular-app' with your actual app name)
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
