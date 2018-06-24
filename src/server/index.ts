import * as bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import foo from '../foo';
import { log } from '../lib/logger';

export default () => {
  const app: express.Application = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  const router = express.Router();

  router.get('/', (_, res: Response) => {
    log('GET request');
    log(foo() + 'GET');
    res.status(200).send({ message: 'Status: OK' });
  });

  router.post('/', ({ body }: Request, res: Response) => {
    log('POST request');
    res.status(200).send({ data: body });
  });

  app.use('/', router);

  const PORT: number = 4040;
  app.listen(PORT, () => {
    log('\n\n\n');
    log(`Server started!`);
    log(`Listening on port: ${PORT}`);
  });

  return app;
};
