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

# Create a new stage for the final image
FROM node:16.15.1

# Set the working directory inside the container
WORKDIR /usr/src

# Copy the built application from the build stage
COPY --from=build /usr/src/build ./build

# Install compression middleware
RUN npm install compression

# Expose the port your application will listen on
EXPOSE 3000

# Define the command to start your application with compression
CMD ["npm", "run", "start-compressed"]
