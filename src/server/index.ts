import * as bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import { log } from '../lib/logger';
import * as orderbook from './orderbook';
import * as root from './root';

export default () => {
  const app: express.Application = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined'));

  const router = express.Router();

  router.get('/', root.GET);
  router.get('/orderbook', orderbook.GET);

  app.use('/', router);

  const PORT: number = 4040;
  app.listen(PORT, () => {
    log('\n\n\n');
    log('Server started!');
    log(`Listening on port: ${PORT}`);
  });

  return app;
};
