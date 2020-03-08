const { RpcClient } = require('jsonrpc-ts');

module.exports = class BitcoindRpc {
  constructor() {
    const clientOptions = {
      url: "http://bitcoind:18443",
      //  headers: {
      //  "content-type": "text/plain"
      // },
      auth: {
        username: "paco",
        password: "paco"
      }
    }
    try {
      this.rpcClient = new RpcClient(clientOptions)
    } catch(err) {
      console.log('ERROR RpcClient', err)
    }
  }

  async getblockcount() {
    try {
      const resp = await this.rpcClient.makeRequest({
        method: 'getblockcount',
        params: [],
        // id: 2,
        jsonrpc: '2.0',
      })
      console.log('res', resp.data)

      return resp.data
    } catch(err) {
      console.log('ERROR getblockcount', err)
    }
  }
}
