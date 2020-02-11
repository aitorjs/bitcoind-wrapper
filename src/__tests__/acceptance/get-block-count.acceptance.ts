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

  it('getBlockCount', async () => {
    console.log('getBlockCount')
   /*  // arrange
    const product = await givenProduct({
      name: 'Ink Pen',
      slug: 'ink-pen',
      price: 1,
      category: 'Stationery',
      description: 'The ultimate ink-powered pen for daily writing',
      label: 'popular',
      available: true,
      endDate: null,
    });
    const expected = Object.assign({id: product.id}, product);

    // act
    const response = await client.get('/product/ink-pen');

    // assert
    expect(response.body).to.containEql(expected); */
  });

});
