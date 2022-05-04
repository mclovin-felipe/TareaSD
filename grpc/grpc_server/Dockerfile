FROM node:17.8.0-alpine3.15

WORKDIR /grpc_server

COPY . .

RUN apk add --update --no-cache alpine-sdk \
&& npm install

CMD ["npm", "start"]