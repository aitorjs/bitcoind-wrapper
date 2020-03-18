const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const Rpc = require('./lib/bitcoind-rpc')

const typeDefs = gql`
  type Blockcount {
    height: Int!
  }
  type Block {
    hash: String!
    confirmations: Int!
    size: Int!
    height: Int!
    version: Int!
    merkleroot: String!
    tx: String!
    time: String!
    mediantime: String!
    nonce: Int!
    bits: String!
    difficulty: String!
    previousblockhash: String!
  }
  type Query {
    getblockcount: Blockcount!
  }
  extend type Query {
    getblock(hash: String): Block!
  }
`;

const resolvers = {
  Query: {
    getblockcount: async (parent, args, context) => {
      // const authHeaders = context.headers.authorization || '';
      console.log('parent', parent)
      console.log('args', args)
      console.log('context', context)

      try {
        const blockcount = await new Rpc().getblockcount()
        return { height: blockcount };
      } catch(e) {
        console.log(e);
        return null;
      }
    },
    getblock: async (parent, args, context) => {
      // 0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206
      console.log('parent GET BLOCK', parent)
      console.log('args', args)
      console.log('context', context)

      try {
        const block = await new Rpc().getblock(args.hash);
        block.tx = JSON.stringify(block.tx)

        return {
          hash, confirmations, size, height, version,
          tx, time, mediantime, nonce, bits, difficulty
        } = block
      } catch(e) {
        console.log(e);
        return null;
      }
    }
  }
};

const context = ({req}) => {
  return { headers: req.headers };
};

const schema = new ApolloServer({ typeDefs, resolvers, context, playground: true });
// process.env.PORT
schema.listen({ port: 9000}).then(({ url }) => {
    console.log(`schema ready at ${url}`);
});
