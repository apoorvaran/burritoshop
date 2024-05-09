# Use the official Node.js image as a base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install sqlite3 --save
# Copy the rest of the application code
COPY . .

# Compile TypeScript code to JavaScript (assuming tsconfig.json is present)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "./dist/index.js"]
