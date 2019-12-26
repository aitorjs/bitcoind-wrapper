import {getService, juggler} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {RestSampleDataSource} from '../datasources/restsample.datasource';

export interface RestSampleResponseData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface RestSampleService {
  getrestdata(id?: number): Promise<RestSampleResponseData>;
}

export class RestSampleProvider implements Provider<RestSampleService> {
  constructor(
    @inject('datasources.restsample')
    protected dataSource: juggler.DataSource = new RestSampleDataSource(),
   ) {}

  value(): Promise<RestSampleService> {
    return getService(this.dataSource);
  }
}
