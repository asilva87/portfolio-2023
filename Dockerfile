FROM node:18-alpine3.17

WORKDIR /app

# Install Angular CLI
RUN npm install -g @angular/cli

# Copy app files
COPY . .

# Install dependencies
RUN npm install && rm -rf node_modules

# Expose port 4200 for the development server
EXPOSE 4200

# Start the development server
CMD ["ng", "serve", "--host", "0.0.0.0"]