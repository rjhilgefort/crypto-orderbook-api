import { Request, Response } from 'express';
import * as R from 'ramda';
import { log } from '../lib/logger';
import fetchOrderbook from '../orderbook';
import { CombindedOrderbook } from '../types/exchanges';
import * as U from '../utils';

export const GET = (req: Request, res: Response) => {
  const market = req.query.market;
  log(`==> Fetching market: ${market}`);
  return R.compose(
    U.thenP2(
      (orderbook: CombindedOrderbook) =>
        res.status(200).send({ data: orderbook }))
      (() =>
       res.status(200).send({
         error: `Could not process market on all exchanges: ${market}`,
       })),
    fetchOrderbook,
  )({ market });
};
