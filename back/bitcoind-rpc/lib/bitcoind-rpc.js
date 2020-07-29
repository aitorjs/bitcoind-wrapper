const Client = require('bitcoin-core')
const fs = require('fs')

module.exports = class Bitcoin {
  constructor() {
    console.log('env', process.env)
    const auth = fs.readFileSync(process.env.BITCOIND_RPC_COOKIE,
      { encoding: 'utf8' }).split(":");

    this.client = new Client({
      // network: 'regtest',
      port: process.env.BITCOIND_RPC_PORT,
      host: process.env.BITCOIND_RPC_HOST,
      username: auth[0],
      password: auth[1]
    })

    // this.fee = new Big(0.00001000)
    this.fee = undefined
  }

  async getblockcount() {
    try {
      return await this.client.getBlockCount()
    } catch (e) {
      console.log('\n    Error Bitcoin getblockcount', e)
    }
  }

  async getblock(block_hash) {
    try {
      return await this.client.getBlock(block_hash, 2)
    } catch (e) {
      console.log('\n    Error Bitcoin getblock', e)
    }
  }

  async gettransaction(txid) {
    try {
      const tx = await this.client.getRawTransaction(txid, true)
      return tx
    } catch (e) {
      console.log('\n    Error Bitcoin gettransaction', e)
    }
  }

  async getaddressinfo(address) {
    try {
      const addr = await this.client.getAddressInfo(address)
      return addr
    } catch (e) {
      console.log('\n    Error Bitcoin getaddressinfo', e)
    }
  }

  /* async listunspent() {
    try {
     return await this.client.listUnspent()
    } catch (e) {
      console.log('\n    Error Bitcoin listunspent', e)
    }
  }

  async createrawtransaction(inputs, outputs) {
    try {
      return await this.client.createRawTransaction(inputs, outputs)
     } catch (e) {
       console.log('\n    Error Bitcoin createrawtransaction', e)
     }
  }

  async signrawtransactionwithwallet(txHex) {
    try {
      return await this.client.signRawTransactionWithWallet(txHex)
     } catch (e) {
       console.log('\n    Error Bitcoin signrawtransactionwithwallet', e)
     }
  }

  async sendrawtransaction(hex) {
    try {
      return await this.client.sendRawTransaction(hex)
     } catch (e) {
       console.log('\n    Error Bitcoin sendrawtransaction', e)
     }
  }

  async estimatesmartfee(blockWait) {
    try {
      return await this.client.estimateSmartFee(blockWait)
     } catch (e) {
       console.log('\n    Error Bitcoin estimatesmartfee', e)
     }
  }

  async getfee(smartFee, txBytes) {
    let fee = (smartFee / 1024) * txBytes
    fee = parseFloat((fee).toFixed(8))

    return fee
  } */
}
