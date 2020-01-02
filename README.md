# bitcoind-wrapper

## Install
- ```docker-compose up -d```

## Install manually
- Run bitcoind container: ```docker run --user $(id -u):$(id -g) --name testing-btc-live -v /home/aibanez/cyphernode/bitcoin/:/app/data -p 18332:18332 -td test-btc-img```. User and group for ```/home/aibanez/cyphernode/bitcoin/``` needs to be $(id -g)
- Run mongod container: ```docker run --name mongod -d -v /var/lib/mongodb:/data/db -p 27017:27017 mongo:3.6.3```
- Run bitcoincli-wrapper (loopkack4 JWT API) container:
    - ```docker build -t bitcoincliwrapper .```
    - ```docker run --name bitcoincliwrapper -p 3000:3000 -d bitcoincliwrapper```


## Make new user and get their JWT token
https://loopback.io/doc/en/lb4/Authentication-Tutorial.html#try-it-out

- POST /users
```
{
  "email": "user1@example.com",
  "password": "thel0ngp@55w0rd",
  "firstName": "User",
  "lastName": "One"
}
```
- POST /users/login
```
{
  "email": "user1@example.com",
  "password": "thel0ngp@55w0rd"
}
```

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjdhMmZhNjIyODM3MjEzODI2YWE2YiIsIm5hbWUiOiJVc2VyIE9uZSIsImlhdCI6MTU3NzQ2MDE3MCwiZXhwIjoxNjM3NDYwMTcwfQ.hJko5UGN-TaS58JokZpWkyeeljt9LcuNG1BwRyaaMrU

## Docker
### TODO bitcoind
- Meter auth en getblockcount
- .env para src/keys.ts
- Cambiar bitcoincli por bitcoind
- Tests para getblockcount

### bitcoind  (https://github.com/lukechilds/docker-bitcoind)
- https://medium.com/mwpartners/containerizing-bitcoin-and-ethereum-with-docker-7c447b484f3a?
- https://ma.ttias.be/enable-the-rpc-json-api-with-password-authentication-in-bitcoin-core/


- Run container: ```docker run --user $(id -u):$(id -g) --name testing-btc-live -v /home/aibanez/cyphernode/bitcoin/:/app/data -p 18332:18332 -td test-btc-img```. User and group for ```/home/aibanez/cyphernode/bitcoin/``` needs to be $(id -g)
- Make curl using rpcuser/rpcpassword: ```curl --user paco --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockcount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:18332/```
- Make curl using authcookie from .cookie: ```curl --data '{"jsonrpc":"1.0","id":"curltext","method":"getblockcount"}'  http://$(cat $HOME/cyphernode/bitcoin/.cookie)@127.0.0.1:18332```

- Build image: ```sudo docker build --build-arg ARCH=amd64 -t lukechilds/bitcoind:amd64 .```

#### bitcoin.conf example for testnet
(use rpcuser/rpcpass inside docker for authentication)
```
# testnet
testnet=1
server=1
txindex=1
rpcuser=paco
rpcpassword=paco

# ATTENTION: VERY DANGEROUS OUTSIDE THE DOCKER NETWORK
[test]
rpcbind=0.0.0.0:18332
rpcallowip=0.0.0.0/0
```

#### .cookie
```
paco:paco
```

### mongo (https://hub.docker.com/_/mongo)

```docker run --name mongod -d -v /var/lib/mongodb:/data/db -p 27017:27017 mongo:3.6.3```

https://subscription.packtpub.com/book/big_data_and_business_intelligence/9781787126480/1/ch01lvl1sec18/running-mongodb-as-a-docker-container

### loopback4
- ```docker build -t bitcoincliwrapper .```
- ```docker run --name bitcoincliwrapper -p 3000:3000 -d bitcoincliwrapper```


### config changes outside vs inside docker

- On ```src/datasources/mongo.datasource.config.json``` change ```"host": "127.0.0.1",``` for ```"host": "mongo",```
- On ```src/repositories/bitcoin.repository.ts``` change  ```url: "http://localhost:18332",``` for ```url: "http://bitcoind:18332",```

## Docker-compose

- ```docker-compose up -d```

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

bitcoincli-wrapper_default
