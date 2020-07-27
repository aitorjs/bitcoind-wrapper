# bitcoind-wrapper
## Install v0.2: hasura + subscriptions for websockets + front
- ```git clone https://github.com/aitorjs/bitcoind-wrapper```
- ```cd bitcoind-wrapper```
- make .env for front/bitcoind-zmq in front/bitcoind-zmq/.env with
```
VUE_APP_HASURA_PASS=secretkey
VUE_APP_HASURA_SCHEMA=ws://GRAPHQL_IP:8080/v1/graphql
```

- To change the configuration or want you need inside .bitcoin, use
```$HOME/cyphernode/bitcoin/``` folder and permissions to local 1000 UID user. Make bitcoin.conf here: <a href="#regtest">regtest</a> and <a href="#testnet">testnet</a>
- ```docker network create back```
- ```docker network create front```
- ```docker-compose up --build -d```
- Create block table inside postgreql:
```sh
- docker exec -it bitcoindwrapper_postgres_1 bash
- wget https://raw.githubusercontent.com/aitorjs/bitcoind-wrapper/master/docker/dbexport.pgsql
- psql -U postgres postgres < dbexport.pgsql
```
- Open on browser for hasura console: ```http://VUE_IP:8080/```. ```secretkey``` is the password.
- Inside "Data" => "Untracked tables or views", click on the "Track" button for block.
- Click "Remote Schemas" -> "Add"
- As "GraphQL server URL" add "http://bitcoind-rpc:9000/"
- Open on a browser frontend: ```http://VUE_IP:3001```
- <a href="#newblock">Generate new block</a>

## <span id="newblock">Generate new block inside bitcoin container on regtest</span>
- Enter to container with ```docker exec -it bitcoind-wrapper_bitcoind_1 bash```
- Generate new block: ```bitcoin-cli generatetoaddress [number-blocks] [address]```
- List of all addresses of the node: ```bitcoin-cli getaddressesbylabel ""```
- New bech32/segwit address: ```bitcoin-cli getnewaddress "main" "bech32"```

## <span id="regtest">bitcoin.conf example for regtest</span>
```
# Use the regtest network, because we can generate blocks as needed.
regtest=1

server=1
rpcuser=paco
rpcpassword=paco

zmqpubhashblock=tcp://0.0.0.0:3000
zmqpubrawblock=tcp://0.0.0.0:3001
# zmqpubrawtx=tcp://0.0.0.0:3002
# zmqpubhashtx=tcp://0.0.0.0:3003
# blocknotify=/usr/bin/curl -X GET bitcoindwrapper:3000/bitcoin/newblock/%s -H "accept: application/json" -H "Authorization: Bearer YOUR-TOKEN"

[regtest]
# ATTENTION: VERY DANGEROUS OUTSIDE THE DOCKER NETWORK
rpcbind=0.0.0.0:18443
rpcallowip=0.0.0.0/0
```
## <span id="testnet">bitcoin.conf example for testnet</span>
```
testnet=1

server=1
rpcuser=paco
rpcpassword=paco

txindex=1

# In this example we are only interested in receiving raw transactions.
# The address here is the URL where bitcoind will listen for new ZeroMQ connection requests.
zmqpubhashblock=tcp://0.0.0.0:3000
zmqpubrawblock=tcp://0.0.0.0:3001
# zmqpubrawtx=tcp://0.0.0.0:3002
# zmqpubhashtx=tcp://0.0.0.0:3003
# blocknotify=/usr/bin/curl -X GET bitcoindwrapper:3000/bitcoin/newblock/%s -H "accept: application/json" -H "Authorization: Bearer YOUR-TOKEN"

[test]
# ATTENTION: VERY DANGEROUS OUTSIDE THE DOCKER NETWORK
rpcbind=0.0.0.0:18332
rpcallowip=0.0.0.0/0
```

- If the blockchain dont download blocks you need to open port 18443 (regtest) or 18332 (testnet) on the firewall

### Bitcoin ports under different networks

        | Mainnet | Testnet | Regtest
Network |  8333   |  18333  |  18444
RPC     |  8332   |  18332  |  18443

## Pre-requisites
```
- sudo apt-get install git docker.io docker-compose
- sudo usermod -aG docker $USER
- reload pc
```

## .cookie
```
paco:paco
```

## Ports

- 8080: Hasura console
- 3001: frontend (8081 with ```npm run serve```


## Miscelania

### TODO zmq

### hasura call to getblockcount
curl 'http://VUE_IP:9000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:9000' --data-binary '{"query":"query {\n  getblockcount {\n    height\n  }\n}"}' --compressed

curl -X POST http://VUE_IP:8080/v1/graphql -H 'x-hasura-admin-secret: secretkey' -H 'Content-Type: application/json' -d '{"query":"query{\n  getblockcount {\n    height\n  }\n}"}'

### bitcoin-rpc call to getblockcount
curl --user paco --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockcount", "params": [] }' -H 'content-type: text/plain;' http://bitcoind:18443

###  Add "Remote Schema" in hasura
- Go to hasura explorer: http://VUE_IP:8080/
- Click "Remote Schemas" -> "Add"
- As "GraphQL server URL" add "http://bitcoind-rpc:9000/"

### Screenshot front/bitcoind-zmq
![Homepage](screenshot.png)
![Blockdetails](screenshot-block-details.png)

### Rebuild bitcoind-zmq-front
- ```cd front/bitcoind-zmq```
- ```npm run build```
- ```docker build -t bitcoind-wrapper_bitcoind-zmq-front .``` ¿can delete this tep?
- ```cd .. && cd .. && docker-compose up --build -d```

### For other containers
- ```docker stop```
- ```docker-compose up --build -d```

### Getblock in graphql

query MyQuery {
  getblock(hash: "5dee5822368296e72c64bd1ba57bc6d038aecff38b0905416dfb544c3c2d2105") {
    bits
    tx {
      hash
      hex
      locktime
      size
      txid
      version
      vsize
      weight
      vin {
        coinbase
        sequence
      }
      vout {
        n
        scriptPubKey {
          addresses
          asm
          hex
          type
          reqSigs
        }
        value
      }
    }
    height
  }
}

### About posgreql


pg_dump -U postgres postgres > dbexport.pgsql

postgrespassword


docker exec -t bitcoindwrapper_postgres_1 psql -U postgres postgres < /var/lib/postgresql/data/dbexport.pgsql

posgreql volume data is stored inside docker in /var/lib/docker/volumes/bitcoindwrapper_db_data/_data


### electrs inside docker container

docker build -t bitcoind-wrapper_bitcoind-electrs .

docker run --network back --volume $HOME/cyphernode/bitcoin:/home/user/.bitcoin --user user -it bitcoind-wrapper_bitcoind-electrs

electrs -vvvv --daemon-dir ~/.bitcoin --daemon-rpc-addr bitcoind:18332 --network testnet --db-dir .electrs/db --electrum-rpc-addr 0.0.0.0:50001 --txid-limit 1000
