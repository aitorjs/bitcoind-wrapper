import request from 'request'

export class BitcoinRepository {
  constructor() {

  }

  async getblockcount() {
   const options = this._getConfig('getblockcount')

   return request.post(options, (err: any, response: any, body: any) => {
      if (err) {
        console.error('An error has occurred: ', err)
      }

      return JSON.parse(body)
    })
  }

  private _getConfig(method: any) {
    return {
      // url: "http://192.168.1.69:18332",
      url: "http://10.107.1.3:18332",
     /*  headers: {
        "content-type": "text/plain"
      }, */
      auth: {
        user: "paco",
        pass: "paco"
      },
      body: JSON.stringify({"method": method, "params": [] })
    }
  }


}
