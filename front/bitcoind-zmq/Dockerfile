FROM node:13-slim

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node serve.js .
COPY --chown=node ./dist ./dist

RUN npm install express connect-history-api-fallback

CMD [ "node", "./serve.js" ]
