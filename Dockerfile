FROM node:12
WORKDIR /
COPY package*.json /app/
RUN npm install
COPY . /app/
CMD ["npm", "start"]