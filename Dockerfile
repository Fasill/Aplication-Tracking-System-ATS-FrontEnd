# Use the specified Node.js version as a build stage
FROM node:16.15.1 as build

# Set the working directory inside the container
WORKDIR /usr/src

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install project dependencies
RUN npm ci --only=production

# Copy the rest of the application code to the container
COPY . .

# Build the application (if needed, adjust this step based on your project)
RUN npm run build

# Runtime Stage
FROM node:16.15.1-alpine

# Set the working directory for the runtime stage
WORKDIR /usr/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/build ./build
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Expose the port your application will listen on
EXPOSE 3000

# Define the command to start your application
CMD ["npm", "start"]
