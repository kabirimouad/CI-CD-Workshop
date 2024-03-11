FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

COPY prisma/ ./prisma/

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5000

RUN apk add --no-cache bash

CMD ["/bin/bash", "-c", "yarn prisma db push; yarn start"]
