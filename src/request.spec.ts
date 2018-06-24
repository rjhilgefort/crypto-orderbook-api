// tslint:disable:no-expression-statement
import { Polly } from '@pollyjs/core';
import { test } from 'ava';
import request from './request';

test('makes requests', async t => {
  const polly = new Polly('makes requests');
  const { server } = polly;

  server.get('/foo').intercept((_: any, res: any) => {
    res.status(200);
    res.json({ message: 'hi mom' });
  });

  const response = await request('https://whatever.com')('/foo')();
  t.is(response, { data: {
    message: 'hi mom',
  } });
});
