import nock from 'nock';
import { request } from './request';

const HOST = 'https://whatever.com';

it('makes requests, correctly identifies GET requests', async () => {
  const payload = { message: 'hi mom' };

  nock(HOST)
    .get('/foo')
    .reply(200, payload);

  const response = await request(HOST)('/foo')();
  expect(response.data).toEqual(payload);
});

it('posts when there is `data` present', async () => {
  const payload = { id: '12345' };

  nock(HOST)
    .post('/foo')
    .reply(202, payload);

  const response = await request(HOST)('/foo')({ name: 'foo bar' });
  expect(response.data).toEqual(payload);
});
