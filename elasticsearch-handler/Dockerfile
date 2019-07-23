FROM node:8.16.0-alpine

WORKDIR /app

COPY ./package.json ./package.json
RUN yarn install

COPY . .

ENV NATS_URI='nats://nats:4222'
ENV ES_HOST='elasticsearch'
ENV ES_PORT='9200'

CMD npm start