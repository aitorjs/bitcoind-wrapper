
### Install

- git clone https://github.com/romanz/electrs
- docker build -t bitcoind-wrapper_bitcoind-electrs .


#### Use
- docker run --network back --volume $HOME/cyphernode/bitcoin:/home/user/.bitcoin --volume $HOME/cyphernode/bitcoin/.electrs:/home/user/.electrs -it bitcoind-wrapper_bitcoind-electrs
- electrs -vvvv --daemon-dir ~/.bitcoin --daemon-rpc-addr bitcoind:18332 --network testnet --db-dir .electrs/db --electrum-rpc-addr 0.0.0.0:50001 --txid-limit 1000
