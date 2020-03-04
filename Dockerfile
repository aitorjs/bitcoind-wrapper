FROM node:13-slim

RUN apt-get update
RUN apt-get install curl git python make g++ -y

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node back/* ./

# RUN git clone https://gitlab.com/aitoribanez/bitcoin-zmq
RUN npm install

CMD [ "node", "./index.js" ]
