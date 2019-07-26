FROM node:8.16.0-alpine

WORKDIR /app

COPY ./package.json ./package.json
RUN yarn install

ENV NATS_URI='nats://nats:4222'
ENV ES_HOST='elasticsearch'
ENV ES_PORT='9200'

COPY . .

RUN apk add --no-cache openssl
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

CMD dockerize -wait tcp://elasticsearch:9200 -wait-retry-interval 5s yarn start
