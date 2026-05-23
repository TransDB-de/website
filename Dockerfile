# Build Image
FROM node:lts-alpine as build

WORKDIR /tmp/

COPY package.json ./
COPY package-lock.json ./

RUN apk add --no-cache git
RUN npm ci

COPY . .

RUN npm run build

# Production Image
FROM node:lts-alpine

WORKDIR /app/

ENV NODE_ENV=production

COPY --from=build tmp/build/ ./build/
COPY --from=build tmp/package.json ./
COPY --from=build tmp/package-lock.json ./

RUN apk add --no-cache git

RUN npm ci

RUN apk del git

CMD [ "node", "build/index.js" ]
