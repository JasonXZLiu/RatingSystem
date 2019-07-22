FROM node:8.16.0-alpine

WORKDIR /app

COPY ./package.json ./package.json
RUN yarn install

COPY . .

EXPOSE 4001

ENV NATS_URI='nats://nats:4222'
ENV SERVER_PORT='4000'
ENV SERVER_HOST='0.0.0.0'
ENV MONGO_HOST='mongo'
ENV DB_NAME='ratingSystem'

CMD npm start