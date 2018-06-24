import * as env from './env';
import { error } from './logger';
import server from './server';

if (env.notValid()) {
  error('process.env variables are not configured properly');
  process.exit(1);
}

server();
