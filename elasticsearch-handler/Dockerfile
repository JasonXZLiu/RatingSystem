FROM node:8.16.0-alpine

WORKDIR /app

COPY ./package.json ./package.json
RUN yarn install

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY . .

ENV NATS_URI='nats://nats:4222'
ENV ES_HOST='elasticsearch'
ENV ES_PORT='9200'

CMD npm start