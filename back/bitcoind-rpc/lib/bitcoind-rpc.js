const Client = require('bitcoin-core')

module.exports = class Bitcoin {
  constructor() {
    console.log('env', process.env)
    this.client = new Client({
      // network: 'regtest',
      port: process.env.BITCOIND_RPC_PORT,
      host: process.env.BITCOIND_RPC_HOST,
      username: process.env.BITCOIND_RPC_USERNAME,
      password: process.env.BITCOIND_RPC_PASSWORD
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

  async getTransaction(txid) {
    try {
      return await this.client.getTransaction(txid)
     } catch (e) {
       console.log('\n    Error Bitcoin getTransaction', e)
     }
  }

  /* async listUnspent() {
    try {
     return await this.client.listUnspent()
    } catch (e) {
      console.log('\n    Error Bitcoin listUnspent', e)
    }
  }

  async createRawTransaction(inputs, outputs) {
    try {
      return await this.client.createRawTransaction(inputs, outputs)
     } catch (e) {
       console.log('\n    Error Bitcoin createRawTransaction', e)
     }
  }

  async signRawTransactionWithWallet(txHex) {
    try {
      return await this.client.signRawTransactionWithWallet(txHex)
     } catch (e) {
       console.log('\n    Error Bitcoin signRawTransactionWithWallet', e)
     }
  }

  async sendRawTransaction(hex) {
    try {
      return await this.client.sendRawTransaction(hex)
     } catch (e) {
       console.log('\n    Error Bitcoin sendRawTransaction', e)
     }
  }

  async estimateSmartFee(blockWait) {
    try {
      return await this.client.estimateSmartFee(blockWait)
     } catch (e) {
       console.log('\n    Error Bitcoin estimateSmartFee', e)
     }
  }

  async getFee(smartFee, txBytes) {
    let fee = (smartFee / 1024) * txBytes
    fee = parseFloat((fee).toFixed(8))

    return fee
  } */
}
