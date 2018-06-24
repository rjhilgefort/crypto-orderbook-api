import { log } from './lib/logger';

const foo: number = 2;

export default () => {
  log(foo);
  return 'foo';
};
