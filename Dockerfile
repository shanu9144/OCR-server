# Step 1: Node Version
FROM node:21.7.3

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Expose the port your app runs on (e.g., 3000)
EXPOSE 3000

# Step 7:Command to run your application
CMD ["node", "app/server.js"]
