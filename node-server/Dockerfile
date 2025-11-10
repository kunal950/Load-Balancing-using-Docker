# Use Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy files
COPY index.js .

# Install dependencies (none needed here, but keeping npm init)
RUN npm init -y && npm install express

# Expose the port (dynamically set later)
EXPOSE 3000

# Run the app
CMD ["node", "index.js"]
