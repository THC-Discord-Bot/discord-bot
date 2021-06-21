# Install 
FROM node:12

# Set as default directory
WORKDIR /

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Run 
CMD ["npm", "start"]