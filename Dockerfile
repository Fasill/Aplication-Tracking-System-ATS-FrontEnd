# Use a lightweight Node.js image as a base
FROM node:16.15.1-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install 'serve' to serve static files
RUN npm install -g serve

# Copy the build directory from your local machine to the container
COPY build/ .

# Expose the port that 'serve' will use (default is 5000)
EXPOSE 3000

# Use 'serve' to serve the static files
CMD ["serve", "-s", "."]
