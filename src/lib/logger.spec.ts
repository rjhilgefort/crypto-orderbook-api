// tslint:disable:no-expression-statement
import { test } from 'ava';
import { log, warn } from './logger';

test('log', t => {
  t.is(log('foo'), undefined);
});

test('warn', t => {
  t.is(warn('foo'), undefined);
});
