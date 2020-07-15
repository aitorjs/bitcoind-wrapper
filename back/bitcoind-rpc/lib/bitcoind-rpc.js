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

  async getanytransaction(txid) {
    try {
      // getRawTransaction
      // decodeRawTransaction
      const rawTransaction = await this.client.getRawTransaction(txid)
      const tx = await this.client.decodeRawTransaction(rawTransaction)
      console.log('tx', tx)

      tx.hex = rawTransaction
      return tx

    } catch (e) {
      console.log('\n    Error Bitcoin getTransaction', e)
    }
  }

  /* async gettransaction(txid) {
      try {
        return await this.client.getTransaction(txid)
       } catch (e) {
         console.log('\n    Error Bitcoin getTransaction', e)
       }
    }

  async listunspent() {
    try {
     return await this.client.listUnspent()
    } catch (e) {
      console.log('\n    Error Bitcoin listUnspent', e)
    }
  }

  async createrawtransaction(inputs, outputs) {
    try {
      return await this.client.createRawTransaction(inputs, outputs)
     } catch (e) {
       console.log('\n    Error Bitcoin createRawTransaction', e)
     }
  }

  async signrawtransactionWithWallet(txHex) {
    try {
      return await this.client.signRawTransactionWithWallet(txHex)
     } catch (e) {
       console.log('\n    Error Bitcoin signRawTransactionWithWallet', e)
     }
  }

  async sendrawtransaction(hex) {
    try {
      return await this.client.sendRawTransaction(hex)
     } catch (e) {
       console.log('\n    Error Bitcoin sendRawTransaction', e)
     }
  }

  async estimatesmartfee(blockWait) {
    try {
      return await this.client.estimateSmartFee(blockWait)
     } catch (e) {
       console.log('\n    Error Bitcoin estimateSmartFee', e)
     }
  }

  async getfee(smartFee, txBytes) {
    let fee = (smartFee / 1024) * txBytes
    fee = parseFloat((fee).toFixed(8))

    return fee
  } */
}
