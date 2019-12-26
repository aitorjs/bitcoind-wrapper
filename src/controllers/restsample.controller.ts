import {inject} from '@loopback/context'
import {RestSampleService} from '../services/restsample.service'
import {get, param} from '@loopback/rest'
var request = require('request')

export class RestSampleController {
  constructor(
    @inject('services.RestSample')
    private restSampleService: RestSampleService,
   ) {}

  @get('/rest')
  getall() {
    return this.restSampleService.getrestdata();
  }

  @get('/rest/{id}')
  getone(@param.path.number('id') id: number) {
    return this.restSampleService.getrestdata(id);
  }

  @get('/bitcoin/getblockcount')
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
      url: "http://192.168.1.69:18332",
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
