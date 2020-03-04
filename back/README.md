docker run -v /home/aibanez/cyphernode/bitcoin:/bitcoin --name=bitcoind-node -d \
     -p 18444:18444 \
     -p 127.0.0.1:18332:18332 \
     bitcoindevelopernetwork/bitcoind-regtest

## Install dependencies for zeromq.js npm package

### Recipe

## install zeromq.js, cloning the repo. This module is deleted every npm install something. Another way!
```
git pull ubuntu:16.04
docker run -it ubuntu:16.04 /bin/bash
# apt-get update
# apt-get install curl git make gcc g++ cmake python # use python 2.7, c++ 17
# git clone https://github.com/zeromq/zeromq.js
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
# export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
# nvm install 13.0
# cd zeromq.js/
# npm install
```

## install zeromq.js as RERADME.md says. This problem: https://github.com/zeromq/zeromq.js/issues/386
```
git pull ubuntu:16.04
docker run -it ubuntu:16.04 /bin/bash
# apt-get update
# apt-get install curl git make libzmq3-dev cmake python gcc g++ -y # use python 2.7, c++ 17
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
# export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
# nvm install 13.0
# npm init --y
# npm install zeromq@6.0.0-beta.6
```

(target=13.0.1 runtime=node arch=x64 libc= platform=linux) => bitcoind-zmq@1.0.2


## Install bitcoind-zmq, bitcoind and make a try.
```
git pull ubuntu:16.04
docker run -it ubuntu:16.04 /bin/bash
# apt-get update
# apt-get install curl git python make g++ -y # use python 2.7, c++ 17
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
# export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
# nvm install 13.0
# git clone https://gitlab.com/aitoribanez/bitcoin-zmq
# cd bitcoin-zmq/back
# npm install
# curl https://bitcoin.org/bin/bitcoin-core-0.19.0.1/bitcoin-0.19.0.1-x86_64-linux-gnu.tar.gz --output bitcoind.tar.gz
# tar -xvzf bitcoind.tar.gz
# mv bitcoin-0.19.0.1/bin/bitcoind ./
# mv bitcoin-0.19.0.1/bin/bitcoin-cli ./
# mkdir .bitcoin
# cat > ./.bitcoin/bitcoin.conf << EOL
# Use the regtest network, because we can generate blocks as needed.
regtest=1

# In this example, we will keep bitcoind running in one terminal window.
# So we don't need it to run as a daemon.
daemon=0

# RPC is required for bitcoin-cli.
server=1
rpcuser=paco
rpcpassword=paco

# In this example we are only interested in receiving raw transactions.
# The address here is the URL where bitcoind will listen for new ZeroMQ connection requests.
zmqpubhashblock=tcp://127.0.0.1:3000
zmqpubrawblock=tcp://127.0.0.1:3001
# zmqpubrawtx=tcp://127.0.0.1:3002
# zmqpubhashtx=tcp://127.0.0.1:3003

EOL

# ./bitcoind -datadir=./.bitcoin # first console
# node bitcoin-zmq/back/index.js # second console
# ./bitcoin-zmq/back/bitcoin-cli -datadir=./bitcoin-zmq/back/.bitcoin getnewaddress # third console
# ./bitcoin-zmq/back/bitcoin-cli -datadir=./bitcoin-zmq/back/.bitcoin generatetoaddress 1 "2MzmKAq6RZD7a8bRSkTEDYWTHzxiwCoXaJ5" # third console
# Look on second console for new block information :)
```

## Install bitcoind-zmq, bitcoind inside a back network and make a try. This is, for now, the way!
```
wget https://github.com/aitorjs/bitcoind-wrapper/blob/block-listener-psql-graphql-hasura2/docker-compose.yml
docker-compose up --build -d 
git pull ubuntu:16.04
docker run -it --network container:bitcoincli-wrapper_bitcoind_1 ubuntu:16.04 /bin/bash
# apt-get update
# apt-get install curl git python make g++ -y # use python 2.7, c++ 17
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
# export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
# nvm install 13.0
# git clone https://gitlab.com/aitoribanez/bitcoin-zmq
# cd bitcoin-zmq/back
# npm install
# node bitcoin-zmq/back/index.js


# (en bitcoincli-wrapper_bitcoind_1, en otra consola)./bitcoin-zmq/back/bitcoin-cli -datadir=./bitcoin-zmq/back/.bitcoin getnewaddress
# ./bitcoin-zmq/back/bitcoin-cli -datadir=./bitcoin-zmq/back/.bitcoin generatetoaddress 1 "2MzmKAq6RZD7a8bRSkTEDYWTHzxiwCoXaJ5"
# Look on second console for new block information :)
```

### Dockerfile where zmq is compiled
git clone https://github.com/zeromq/libzmq/blob/master/Dockerfile
sudo  docker build . -t zeromq/prueba 


## Install bitcoind
```
wget -O bitcoind.tar.gz https://bitcoin.org/bin/bitcoin-core-0.19.0.1/bitcoin-0.19.0.1-x86_64-linux-gnu.tar.gz
tar -xvzf bitcoin.tar.gz
mv bitcoin-0.19.0.1/bin/bitcoind ./
mv bitcoin-0.19.0.1/bin/bitcoin-cli ./
```

./bitcoin-cli -datadir=./.bitcoin getnewaddress
./bitcoin-cli -datadir=./.bitcoin generatetoaddress 101 "2NCZtFvcCK13iyvAuypgTB3Pw1k1LPHxpme"


cat > ./.bitcoin/bitcoin.conf << EOL
# Use the regtest network, because we can generate blocks as needed.
regtest=1

# In this example, we will keep bitcoind running in one terminal window.
# So we don't need it to run as a daemon.
daemon=0

# RPC is required for bitcoin-cli.
server=1
rpcuser=paco
rpcpassword=paco

# In this example we are only interested in receiving raw transactions.
# The address here is the URL where bitcoind will listen for new ZeroMQ connection requests.
zmqpubhashblock=tcp://127.0.0.1:3000
zmqpubrawblock=tcp://127.0.0.1:3001
# zmqpubrawtx=tcp://127.0.0.1:3002
# zmqpubhashtx=tcp://127.0.0.1:3003

EOL

https://degreesofzero.com/article/streaming-transactions-from-bitcoind-via-zeromq.html

## subscription to changes on block table
```
subscription getNewBlocks {
  block {
    id
    hash
  }
}
```



### Graphl query in nodejs
```js
const { ApolloClient } = require('apollo-boost');
const gql = require('graphql-tag');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

// Create an http link:
const link = new HttpLink({
  uri: 'http://graphql-engine:8080/v1/graphql',
  fetch,
 // headers: getHeaders()
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: true
  })
})
 const MY_QUERY = gql`
    query MyQuery {
      block {
        id
        hash
      }
    }`

 client.query({
  query: MY_QUERY,
})
.then(data => console.log('data', data))
.catch(error => console.error('error', error));
```