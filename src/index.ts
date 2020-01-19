import {BlockchainApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {BlockchainApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new BlockchainApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);
  console.log(`Get API Specs on load ${JSON.stringify(app.restServer.getApiSpec())}`)

  return app;
}
