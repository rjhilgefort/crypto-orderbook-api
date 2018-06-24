// tslint:disable:no-expression-statement
import nock from 'nock';
import request from './request';

it('makes requests, correctly identifies GET requests', async () => {
  const host = 'https://whatever.com';
  const payload = { message: 'hi mom' };

  nock(host)
    .get('/foo')
    .reply(200, payload);

  const response = await request(host)('/foo')();
  expect(response.data).toEqual(payload);
});
