const { ApolloClient } = require('apollo-boost');
const gql = require('graphql-tag');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

const BitcoindZmq = require('bitcoind-zmq')
const btcd = new BitcoindZmq({
  hashblock: process.env.ZMQ_HASHBLOCK,
  rawblock: process.env.ZMQ_RAWBLOCK,
  // rawtx: process.env.ZMQ_RAWTX,
  // hashtx: process.env.ZMQ_HASHTX
 })

// Create an http link:
const link = new HttpLink({
  uri: process.env.HASURA_SCHEMA_URL,
  fetch,
  headers: { 'x-hasura-admin-secret': process.env.HASURA_PASS }
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: true
  })
})

const MUTATION = gql`
  mutation AddBlock($hash: String!) {
    insert_block(objects: {hash: $hash}) {
      affected_rows
      returning {
        id
        hash
      }
    }
  }`

const QUERY = gql`
  query getblock($hash: String!) {
    getblock(hash: $hash) {
      confirmations
      hash
      height
      size
      version
      bits
      difficulty
      mediantime
      nonce
      time
      tx
      merkleroot
      previousblockhash
    }
  }`;

btcd.connect()

btcd.on('hashblock', hash => {
  console.log('got block hash:', hash) // hash <Buffer ... />

  hash = Buffer.from(hash).toString('hex');

  console.log('hash', hash);
  client.query({
    query: QUERY,
    variables: {
      hash
    }
  })
  .then(res => console.log('resp query', res))
  .catch(err => console.error('err query', err));

  // call to bitcoind-rpc (graphql)
  client.mutate({
    mutation: MUTATION,
    variables: {
      hash
    }
  })
  .then(res => console.log('res', res))
  .catch(err => console.error('err mutation', err));
 })

  btcd.on('rawblock', block => {
     console.log('got raw block:', block)
     block = Buffer.from(block).toString('hex')
     console.log('got raw block:22222', block)
  })

  btcd.on('connect:*', (uri, type) => {
   console.log(`socket ${type} connected to ${uri}`)
  })

  btcd.on('error:*', (err, type) => {
    console.error(`${type} had error:`, err)
  })

 /* btcd.on('hashtx', hash => {
    console.log('got tx hash:', hash) // hash <Buffer ... />
  })

  btcd.on('rawtx', tx => {
    console.log('got raw tx:', tx) // tx <Buffer ... />
  })

  btcd.on('retry:*', (type, attempt) => {
    console.log(`type: ${type}, retry attempt: ${attempt}`)
  })

  btcd.on('close:*', (err, type) => {
    console.log(`close ${type}`, err || '')
   }) */

   // const zmq = require('./zeromq/v5-compat.js')


/* var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ hello }', root).then((response) => {
  console.log('resp', response.data.hello);
}); */
