# 1. Base OS Image
FROM ubuntu:16.04
# 2. Copy blockchain client
ADD bitcoin-0.19.0.1 /app
# 3. Setup directory
WORKDIR /app/bin
# 4. Make permissions
RUN chmod +x /app/bin/bitcoind
# 5. Add client.conf file
COPY client.conf /app/client.conf
# 6. Entrypoint
ENTRYPOINT ["/app/bin/bitcoind", "-conf=/app/client.conf"]
