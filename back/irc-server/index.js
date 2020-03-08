const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const typeDefs = gql`
  type Blockcount {
    height: Int!
  }
  type Query {
    getblockcount: Blockcount!
  }
`;

const resolvers = {
  Query: {
    getblockcount: (parent, args, context) => {
      // const authHeaders = context.headers.authorization || '';
      console.log('parent', parent)
      console.log('args', args)
      console.log('context', context)

      try {
        return {height: 1};
      } catch(e) {
        console.log(e);
        return null;
      }
    }
  }
};

const context = ({req}) => {
  return {headers: req.headers};
};

const schema = new ApolloServer({ typeDefs, resolvers, context});
// process.env.PORT
schema.listen({ port: 9000}).then(({ url }) => {
    console.log(`schema ready at ${url}`);
});
