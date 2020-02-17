#!/bin/bash
docker-compose stop
docker-compose rm << EOF
  y
EOF
docker-compose up --build -d
# docker exec -it bitcoincli-wrapper_bitcoindwrapper_1 npm run test2
