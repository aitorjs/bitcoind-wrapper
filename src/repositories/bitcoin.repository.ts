import request from 'request'

export class BitcoinRepository {
  options: any;

  constructor() {
     this.options = {
      // uri: "http://192.168.1.69:18332",
      uri: "http://10.107.1.3:18332",
      //  headers: {
      //  "content-type": "text/plain"
      // },
      auth: {
        user: "paco",
        pass: "paco"
      },
      body: JSON.stringify({"method": "getblockcount", "params": [] })
    }
  }

  async getblockcount() {
    /* let body = JSON.parse(this.options.body)
    body.method = 'getblockcount'
    this.options.body = JSON.stringify(body) */

    return request.post(this.options, (err: any, response: any, body: any) => {
      if (err) {
        console.error('An error has occurred: ', err)
      }

      return JSON.parse(body)
    })
  }
}
