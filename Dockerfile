FROM node:14.17.0-alpine3.13

WORKDIR /app

# Install Angular CLI
RUN npm install -g @angular/cli

# Copy app files
COPY . .

# Install dependencies
RUN npm install

# Expose port 4200 for the development server
EXPOSE 4200

# Start the development server
CMD ["ng", "serve", "--host", "0.0.0.0"]