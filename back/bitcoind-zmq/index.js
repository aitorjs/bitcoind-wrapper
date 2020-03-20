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
  mutation AddBlock($hash: String!, $confirmations: Int!, $size: Int!, $height: Int!, $version: Int!, $merkleroot: String!, $tx: json!, $time: timestamptz!, $mediantime: timestamptz!, $nonce: Int!, $bits: String!, $difficulty: String!, $previousblockhash: String!) {
    insert_block(objects: {hash: $hash, confirmations: $confirmations, size: $size, height: $height, version: $version, merkleroot: $merkleroot, tx: $tx, time: $time, mediantime: $mediantime, nonce: $nonce, bits: $bits, difficulty: $difficulty, previousblockhash: $previousblockhash}) {
      affected_rows
      returning {
        id
        hash
        confirmations
        size
        height
        version
        merkleroot
        tx
        time
        mediantime
        nonce
        bits
        difficulty
        previousblockhash
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

btcd.on('hashblock', async hash => {
  let queryResp;
  console.log('got block hash:', hash) // hash <Buffer ... />

  hash = Buffer.from(hash).toString('hex');
  console.log('hash', hash);

  try {
    queryResp = await client.query({
      query: QUERY,
      variables: {
        hash
      }
    })
    console.log('resp query', queryResp)
  } catch(err) {
    console.error('err on query', err)
  }

  try {
    const block = queryResp.data.getblock
    block.tx = JSON.stringify(block.tx)
    block.time = new Date(block.time * 1000).toISOString()
    block.mediantime =  new Date(block.mediantime * 1000).toISOString()
    delete block.__typename

    console.log('mutation start query', block)

    const mutation = await client.mutate({
      mutation: MUTATION,
      variables: block
    })

    console.log('resp mutation', mutation)
  } catch(err) {
    console.error('err on mutation', err)
  }
 })

  btcd.on('rawblock', async block => {
     console.log('got raw block:', block)
     block = Buffer.from(block).toString('hex')
     console.log('got raw block:22222', block)
  })

  btcd.on('connect:*', async (uri, type) => {
   console.log(`socket ${type} connected to ${uri}`)
  })

  btcd.on('error:*', async (err, type) => {
    console.error(`${type} had error:`, err)
  })

 /* btcd.on('hashtx', async hash => {
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
