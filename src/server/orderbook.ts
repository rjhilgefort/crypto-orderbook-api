import { Request, Response } from 'express';
import * as R from 'ramda';
import fetchOrderbook from '../orderbook';
import { CombindedOrderbook } from '../types/exchanges';
import * as U from '../utils';

export const GET = (req: Request, res: Response) => {
  return R.compose(
    U.thenP((orderbook: CombindedOrderbook) =>
      res.status(200).send({ data: orderbook }),
    ),
    fetchOrderbook,
  )({ market: req.query.market });
};
