#Params for a simple Docker image
FROM node:alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN npm install

# Bundle app source
COPY ./ ./

EXPOSE 3010
CMD [ "npm", "start" ]