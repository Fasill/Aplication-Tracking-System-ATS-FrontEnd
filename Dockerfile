# Use the specified Node.js version as a build stage
FROM node:16.15.1 as build

# Set the working directory inside the container
WORKDIR /usr/src

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application (if needed, adjust this step based on your project)
RUN npm run build

# Install 'gzipper' to gzip the build output
RUN npm install -g gzipper

# Gzip the build output
RUN gzipper --gzip --input ./build --output ./build-gzip

# Create a new image for serving the optimized build
FROM node:16.15.1-alpine

# Set the working directory inside the container
WORKDIR /usr/src

# Copy the optimized build from the build stage
COPY --from=build /usr/src/build-gzip /usr/src/build

# Expose the port your application will listen on
EXPOSE 3000

# Define the command to start your application
CMD ["npm", "start"]
