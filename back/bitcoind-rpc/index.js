const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const Rpc = require('./lib/bitcoind-rpc')

const typeDefs = gql`
  type Blockcount {
    height: Int!
  }
  type ScriptSig {
    asm: String!
    hex: String!
  }
  type Input {
    coinbase: String
    txid: String
    vout: Int
    scriptSig: ScriptSig
    txinwitness: [String]
    sequence: String!
  }
  type ScriptPubKey {
    asm: String!
    hex: String!
    reqSigs: Int
    type: String!
    addresses: [String]
  }
  type Output {
    value: Float!
    n: Int!
    scriptPubKey: ScriptPubKey!
  }
  type Transaction {
    txid: String!
    hash: String!
    version: Int!
    size: Int!
    vsize: Int!
    weight: Int!
    locktime: Int!
    vin: [Input!]
    vout: [Output!]
    hex: String!
    totalamount: Float!
    confirmations: Int
    blockhash: String
    time: String

  }

  type Block {
    hash: String!
    confirmations: Int!
    size: Int!
    height: Int!
    version: Int!
    merkleroot: String!
    tx: [Transaction!]!
    totaltx: Int!
    time: String!
    mediantime: String!
    nonce: String!
    bits: String!
    difficulty: String!
    previousblockhash: String!
  }

  type BTCAddress {
    address: String!
    scriptPubKey: String!
    ismine: Boolean
    solvable: Boolean
    iswatchonly: Boolean
    isscript: Boolean
    iswitness: Boolean
    ischange: Boolean
    labels: [String]
  }

  type Query {
    getblockcount: Blockcount!
  }
  extend type Query {
    getblock(hash: String, first: Int, skip: Int): Block!
  }
  extend type Query {
    gettransaction(txid: String): Transaction!
  }
  extend type Query {
    getaddressinfo(address: String): BTCAddress!
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
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    getblock: async (parent, args, context) => {
      console.log('parent GET BLOCK', parent)
      console.log('args', args)
      console.log('context', context)

      try {
        let block = await new Rpc().getblock(args.hash);

        block.totaltx = block.tx.length;
        block.tx = block.tx.slice(args.first, args.skip);

        block.tx.map((tx, x) => {
          block.tx[x].totalamount = 0
          tx.vout.map(output => {
            block.tx[x].totalamount += output.value
          })
        })

        console.log('new block', block)
        const a = {
          hash, confirmations, size, height, version,
          tx, totaltx, time, mediantime, nonce, bits, difficulty
        } = block
        // console.log('a', a.tx)
        return a
      } catch (e) {
        console.log("err", e);
        return null;
      }
    },
    gettransaction: async (parent, args, context) => {
      /*       console.log('parent GET TX', parent)
            console.log('args', args)
            console.log('context', context)
       */
      try {
        let tx = await new Rpc().gettransaction(args.txid);

        tx.totalamount = 0
        tx.vout.map(output => {
          tx.totalamount += output.value
        })

        return tx
      } catch (e) {
        console.log("err", e);
        return null;
      }

    },
    getaddressinfo: async (parent, args, context) => {
      /*       console.log('parent GET TX', parent)
            console.log('args', args)
            console.log('context', context)
       */
      try {
        console.log('address', args.address)
        const address = await new Rpc().getaddressinfo(args.address);
        console.log('res', address)
        return address
      } catch (e) {
        console.log("err", e);
        return null;
      }

    }
  }
};

const context = ({ req }) => {
  return { headers: req.headers };
};

const schema = new ApolloServer({ typeDefs, resolvers, context, playground: true });
// process.env.PORT
schema.listen({ port: 9000 }).then(({ url }) => {
  console.log(`schema ready at ${url}`);
});
