# The Base Image used to create this Image
FROM node:lts-alpine

# Create app directory, copy files and change workdir
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN apk add --no-cache git
RUN npm install

COPY . .
EXPOSE 3000

RUN npm run build

RUN apk del git
CMD [ "npm", "run", "start" ]