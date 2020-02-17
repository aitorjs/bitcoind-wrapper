import {Client, expect} from '@loopback/testlab';
import {BlockchainApplication} from '../..';
import {setupApplication} from './test-helper';

describe('getBlockCount', () => {
  let app: BlockchainApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('getBlockCount - Valid token', async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjdhMmZhNjIyODM3MjEzODI2YWE2YiIsIm5hbWUiOiJVc2VyIE9uZSIsImlhdCI6MTU3NzQ2MDE3MCwiZXhwIjoxNjM3NDYwMTcwfQ.hJko5UGN-TaS58JokZpWkyeeljt9LcuNG1BwRyaaMrU"

    // curl -X GET "http://localhost:3000/bitcoin/getblockcount" -H "accept: application/json" -H "Authorization: $token"
    await client
      .get('/bitcoin/getblockcount')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        const _res = JSON.parse(res.text)
        expect(_res.result).type('number')
       });
  });

  it('getBlockCount - Invalid token', async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjdhMmZhNjIyODM3MjEzODI2YWE2YiIsIm5hbWUiOiJVc2VyIE9uZSIsImlhdCI6MTU3NzQ2MDE3MCwiZXhwIjoxNjM3NDYwMTcwfQ.not-valid"

    await client
      .get('/bitcoin/getblockcount')
      .set('Authorization', `Bearer ${token}`)
      .expect(401)
      .then((res) => {
        const _res = JSON.parse(res.text)
        expect(_res.error.name).to.be.equal("UnauthorizedError");
        expect(_res.error.message).to.be.equal("Error verifying token : invalid signature");
      });
  });

  it('getBlockCount - No token', async () => {
    await client
      .get('/bitcoin/getblockcount')
      .expect(401)
      .then((res) => {
        const _res = JSON.parse(res.text)
        expect(_res.error.name).to.be.equal("UnauthorizedError");
        expect(_res.error.message).to.be.equal("Authorization header not found.");
      });
  });
});
