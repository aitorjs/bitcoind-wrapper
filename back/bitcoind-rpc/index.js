const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const Rpc = require('./__lib/bitcoind-rpc')

const typeDefs = gql`
  type Blockcount {
    height: Int!
  }
  type Block {
    hash: String!
    confirmations: Int!
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
      console.log('parent GET BLOCK', parent)
      console.log('args', args)
      console.log('context', context)

      try {
        const block = await new Rpc().getblock(args.hash);
        console.log('block', block);
        return { hash: block.hash, confirmations: block.confirmations };
      } catch(e) {
        console.log(e);
        return null;
      }
    }
  }
};

const context = ({req}) => {
  return {headers: req.headers };
};

const schema = new ApolloServer({ typeDefs, resolvers, context, playground: true });
// process.env.PORT
schema.listen({ port: 9000}).then(({ url }) => {
    console.log(`schema ready at ${url}`);
});
