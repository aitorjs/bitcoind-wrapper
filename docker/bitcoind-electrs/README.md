
### Install in docker

- cd docker/electrs
- git clone https://github.com/romanz/electrs
- cp electrs/* . -R
- docker build -t bitcoind-wrapper_bitcoind-electrs .


#### Use in docker
- docker run --network back --volume $HOME/cyphernode/bitcoin:/home/user/.bitcoin --volume $HOME/cyphernode/bitcoin/.electrs:/home/user/.electrs -it bitcoind-wrapper_bitcoind-electrs
- electrs -vvvv --daemon-dir ~/.bitcoin --daemon-rpc-addr bitcoind:18332 --network testnet --db-dir .electrs/db --electrum-rpc-addr 0.0.0.0:50001 --txid-limit 1000


#### Use in docker-compose

```
bitcoin-electrs:
    build: ./docker/bitcoind-electrs
    entrypoint:
      - electrs
    command:
      - -vvvv
      - --daemon-dir
      - /home/user/.bitcoin
      - --daemon-rpc-addr
      - bitcoind:18332
      - --network
      - testnet
      - --db-dir
      - .bitcoin/.electrs/db
      - --electrum-rpc-addr
      - 0.0.0.0:50001
      - --txid-limit
      - "1000"
    volumes:
      - $HOME/cyphernode/bitcoin/:/home/user/.bitcoin
    depends_on:
      - "bitcoind"
    networks:
      - back
    restart: always
```
