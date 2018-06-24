// tslint:disable:no-expression-statement
import { log, warn } from './logger';

it('log', () => {
  expect(log('foo')).toBeUndefined();
});

it('warn', () => {
  expect(warn('foo')).toBeUndefined();
});
