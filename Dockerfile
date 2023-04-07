# syntax=docker/dockerfile:1

# Start your application with a node base image
FROM node:18-alpine

# Create an application directory
RUN mkdir -p /app

# Set the above directory as the working directory
# for any command that follows below
WORKDIR /app

# Copy the local package.json and package-lock.json
# files to the container
COPY package*.json ./

# Copy local directories to the working directory
# of our docker image (/app)
COPY ./src ./src
COPY ./public ./public

# Install node packages, install "serve", build the
# app, and remove dependencies at the end
RUN npm install \
    && npm install -g serve \
    && npm run build \
    && rm -fr node_modules

# Specify that the application in the container listens
# on port 3000
EXPOSE 3000

# Start the app using "serve" command
CMD ["serve", "-s", "build"]