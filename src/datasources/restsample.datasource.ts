import {juggler} from '@loopback/service-proxy';
import * as config from './rest.config.json';

export class RestSampleDataSource extends juggler.DataSource {

  static dataSourceName = 'restsample';

  constructor(dsConfig: object = config) {
    super(dsConfig);
  }
}