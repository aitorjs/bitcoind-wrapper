import { RpcClient } from 'jsonrpc-ts';

export class BitcoinRepository {
  rpcClient: any

  constructor() {
    const clientOptions = {
      // url: "http://localhost:18332", outside docker
      url: "http://bitcoind:18332",
      //  headers: {
      //  "content-type": "text/plain"
      // },
      auth: {
        username: "paco",
        password: "paco"
      }
    }
    try {
      this.rpcClient = new RpcClient<any>(clientOptions)
    } catch(err) {
      console.log('ERROR RpcClient', err)
    }
  }

  async getblockcount() {
    /* let body = JSON.parse(this.options.body)
    body.method = 'getblockcount'
    this.options.body = JSON.stringify(body) */

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
