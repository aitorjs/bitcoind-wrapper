# bitcoind-zmq
FROM node:13-slim

RUN apt-get update
RUN apt-get install curl git python make g++ -y

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node back/index.js .
COPY --chown=node back/package.json .

RUN npm install

CMD [ "node", "./index.js" ]
