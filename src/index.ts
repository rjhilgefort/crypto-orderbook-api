import * as env from './env';
import { error } from './lib/logger';
import server from './server';

if (env.notValid(process.env)) {
  error('process.env variables are not configured properly');
  process.exit(1);
}

server();
