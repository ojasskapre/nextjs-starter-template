# Use the latest official Node.js runtime as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start"]
