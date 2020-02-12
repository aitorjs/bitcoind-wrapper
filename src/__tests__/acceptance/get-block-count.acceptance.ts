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
   /* const expected = Object.assign({id: product.id}, product); */

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjdhMmZhNjIyODM3MjEzODI2YWE2YiIsIm5hbWUiOiJVc2VyIE9uZSIsImlhdCI6MTU3NzQ2MDE3MCwiZXhwIjoxNjM3NDYwMTcwfQ.hJko5UGN-TaS58JokZpWkyeeljt9LcuNG1BwRyaaMrU"

    const response = await client
      .get('/bitcoin/getblockcount')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        console.log('res', res.text)
       });

    // expect(response.body).to.containEql(expected); */

    // http://localhost:3000/bitcoin/getblockcount" -H "accept: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjdhMmZhNjIyODM3MjEzODI2YWE2YiIsIm5hbWUiOiJVc2VyIE9uZSIsImlhdCI6MTU3NzQ2MDE3MCwiZXhwIjoxNjM3NDYwMTcwfQ.hJko5UGN-TaS58JokZpWkyeeljt9LcuNG1BwRyaaMrU

    /*  return request(app)
    .post('/v1/customers')
    .set('Authorization', `Bearer ${adminAccessToken}`)
    .send(customer)
    .expect(httpStatus.CREATED)
    .then((res) => {
     expect(res.body.role).to.be.equal('customer');
    }); */
  });
});
