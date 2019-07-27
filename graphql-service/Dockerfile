FROM node:8.16.0-alpine

WORKDIR /app

COPY ./package.json ./package.json
RUN yarn install

COPY . .

ENV SERVER_PORT='5000'
ENV SERVER_HOST='restapi'

CMD npm start