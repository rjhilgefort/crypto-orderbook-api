// tslint:disable:no-expression-statement
import { test } from 'ava';
import nock from 'nock';
import request from './request';

test('makes requests', async t => {
  const host = 'https://whatever.com';
  const payload = { message: 'hi mom' };

  nock(host)
    .get('/foo')
    .reply(200, payload);

  const response = await request(host)('/foo')();
  t.deepEqual(response.data, payload);
});
