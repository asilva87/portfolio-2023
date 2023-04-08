# Use an official Node.js runtime as a parent image
FROM node:18-alpine3.17 AS build

#Setup the working directory
WORKDIR /usr/src/ng-app

#Copy package.json
COPY package.json package-lock.json ./

# Run npm clean install, including dev dependencies for @angular-devkit
RUN npm ci

# Run npm install @angular/cli
RUN npm install -g @angular/cli

#Copy other files and folder to working directory
COPY . .

#Build Angular application in PROD mode
RUN npm run build

#Download NGINX Image
FROM nginx:1.23.4-alpine

#Copy built angular files to NGINX HTML folder
COPY --from=build /usr/src/ng-app/dist/portfolio-2023 /usr/share/nginx/html