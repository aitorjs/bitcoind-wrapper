const { ApolloClient } = require('apollo-boost');
const gql = require('graphql-tag');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

const BitcoindZmq = require('bitcoind-zmq')
const btcd = new BitcoindZmq({
  hashblock: 'tcp://bitcoind:3000',
  rawblock: 'tcp://bitcoind:3001',
  // rawtx: 'tcp://bitcoind:3002'
  // hashtx: 'tcp://bitcoind:3003'
 })

// Create an http link:
const link = new HttpLink({
  uri: 'http://graphql-engine:8080/v1/graphql',
  fetch,
  headers: { 'x-hasura-admin-secret': 'secretkey' }
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

btcd.connect()

btcd.on('hashblock', (hash) => {
  console.log('got block hash:', hash) // hash <Buffer ... />

  hash = Buffer.from(hash).toString('hex');

  console.log('hash', hash);
  client.mutate({
    mutation: MUTATION,
    variables: {
      hash
    }
  })
  .then(res => console.log('res', res))
  .catch(err => console.error('err', err));
 })

  btcd.on('rawblock', (block) => {
     console.log('got raw block:', block) // block <Buffer ... />
  })

  btcd.on('connect:*', (uri, type) => {
   console.log(`socket ${type} connected to ${uri}`)
  })

  btcd.on('error:*', (err, type) => {
    console.error(`${type} had error:`, err)
  })

 /* btcd.on('hashtx', (hash) => {
    console.log('got tx hash:', hash) // hash <Buffer ... />
  })

  btcd.on('rawtx', (tx) => {
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
