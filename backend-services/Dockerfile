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

RUN apk add --no-cache openssl
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

CMD dockerize -wait tcp://mongo:27017 -wait-retry-interval 5s npm start