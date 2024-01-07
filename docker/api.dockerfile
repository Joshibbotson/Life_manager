# Use a Node.js base image
FROM node:10.7.0

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY ./api/package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code
COPY ./api/ .

# Command to start the Node.js application
CMD ["npm", "build"]
