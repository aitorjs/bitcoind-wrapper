import {Client, createRestAppClient, expect} from '@loopback/testlab';
import {BlockchainApplication} from '../..';
import {setupApplication} from './test-helper';

describe('HomePage', () => {
  let app: BlockchainApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

/* NOT USED. AS EXAMPLE
it('exposes a default home page', async () => {
    await client
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/);
  }); */

  /* it('exposes self-hosted explorer', async () => {
    await client
      .get('http://localhost:3001/explorer/')
      .expect(302)
      .expect('Content-Type', /text\/html/)
      .expect(/<title>LoopBack API Explorer/);
  }); */
});
