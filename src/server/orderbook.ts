import { Request, Response } from 'express';
import { log } from '../lib/logger';
import fetchOrderbook from '../orderbook';
import { CombinedOrderbook } from '../types/exchanges';

export const GET = (req: Request, res: Response) => {
  const market = req.query.market;
  log(`==> Fetching market: ${market}`);
  return fetchOrderbook({ market })
    .then((orderbook: CombinedOrderbook) => {
      res.status(200).send({ data: orderbook })
    }, () => {
      res.status(200).send({
        error: `Could not process market on all exchanges: ${market}`,
      });
    });
};
