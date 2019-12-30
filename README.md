# bitcoincli-wrapper

## Install
- ```git clone https://github.com/aitoribanez/bitcoincli-wrapper```
- ```cd bitcoincli-wrapper```
- ```npm install```
- ```npm run start```

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
- https://medium.com/mwpartners/containerizing-bitcoin-and-ethereum-with-docker-7c447b484f3a?

- Build image: ```sudo docker build -t test-btc-img .```
- Run container: ```docker run --name testing-btc-live -v /home/aibanez/cyphernode/bitcoin/:/app/data -p 18332:8332 -td test-btc-img```
- Make curl from host: ```curl --user paco --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockcount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:18332/```


- ```docker run -v $HOME/cyphernode/bitcoin:/data/.bitcoin --name bitcoind -p 18332:18332 lukechilds/bitcoind```
- ```curl --user paco --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockcount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:18332/```
### bitcoind

### mongo

### loopback4
[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
