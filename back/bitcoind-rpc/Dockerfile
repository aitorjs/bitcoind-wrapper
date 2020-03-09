FROM node:13-slim

# USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node . .
# COPY --chown=node index.js ./
# COPY --chown=node package.json ./
# COPY --chown=node package-lock.json ./

# RUN ls -las

RUN npm install

CMD [ "node", "./index.js" ]
