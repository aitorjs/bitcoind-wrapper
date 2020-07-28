FROM rust:latest

RUN apt-get update
RUN apt-get install -y clang cmake

RUN cargo install electrs

RUN adduser --disabled-login --system --shell /bin/false --uid 1000 user
COPY ./run.sh /home/user

USER user
WORKDIR /home/user

# Electrum RPC
EXPOSE 50001

# Prometheus monitoring
EXPOSE 4224

STOPSIGNAL SIGINT

# CMD ["electrs", "-vvvv", "--timestamp", "--daemon-dir", "~/.bitcoin", "--daemon-rpc-addr", "bitcoind:18332", "--network", "testnet", "--db-dir", ".electrs/db", "--electrum-rpc-addr", "0.0.0.0:50001", "--txid-limit", "1000"]
