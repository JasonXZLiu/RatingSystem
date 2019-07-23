FROM node:8.16.0-alpine

WORKDIR /app

COPY ./package.json ./package.json
RUN yarn install

COPY . .

ENV NATS_URI='nats://nats:4222'
ENV MONGO_HOST='mongo'
ENV DB_NAME='ratingSystem'

CMD npm start