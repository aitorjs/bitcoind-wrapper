# https://vuejs.org/v2/cookbook/dockerize-vuejs-app.html
FROM node:13-slim
# FROM node:lts-alpine

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node serve.js .
COPY --chown=node ./dist ./dist

# RUN npm install -g http-server
RUN npm install express connect-history-api-fallback

# EXPOSE 3000
CMD [ "node", "./serve.js" ]
# CMD [ "http-server", "dist" ]
