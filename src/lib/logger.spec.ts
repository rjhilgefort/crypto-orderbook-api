import { error, log, warn } from './logger';

it('log', () => {
  expect(log('foo')).toBeUndefined();
});

it('warn', () => {
  expect(warn('foo')).toBeUndefined();
});

it('error', () => {
  expect(error('foo')).toBeUndefined();
});
