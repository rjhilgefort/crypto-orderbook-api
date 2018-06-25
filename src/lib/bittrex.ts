import { AxiosResponse } from 'axios';
import queryString from 'query-string';
import * as R from 'ramda';
import S from '../sanctuary';
import { FetchOrderbook, Orderbook } from '../types/exchanges';
import { PromiseReject, thenP, throwT } from '../utils';
import { exchangeGet } from './request';

export interface OrderbookResponse {
  success: boolean;
  message: string;
  result: Orderbook;
}

// @ts-ignore
const {
  EXCHANGE_BITTREX_HOST: host,
  EXCHANGE_BITTREX_PREFIX: prefix,
}: {
  EXCHANGE_BITTREX_HOST: string;
  EXCHANGE_BITTREX_PREFIX: string;
} = process.env;

const bittrexGet = (path: string): AxiosResponse =>
  R.compose(
    thenP(R.when(R.pathEq(['success'], false), throwT)),
    exchangeGet({ host, prefix }),
  )(path);

const parseParams = R.applySpec({
  market: R.compose(
    R.replace('_', '-'),
    R.defaultTo(''),
    R.prop('market'),
  ),
  type: R.always('both'),
});

type NormalizeOrderbookResponse = (OrderbookResponse) => Orderbook;
// @ts-ignore
const normalizeOrderbookResponse: NormalizeOrderbookResponse = R.compose(
  R.map(
    R.map(
      R.evolve({
        Rate: R.toString,
      }),
    ),
  ),
  R.applySpec({
    asks: R.prop('buy'),
    bids: R.prop('sell'),
  }),
  R.prop('result'),
);

export const fetchOrderbook: FetchOrderbook = R.compose(
  thenP(normalizeOrderbookResponse),
  // @ts-ignore
  S.either(PromiseReject)(bittrexGet),
  R.map(R.concat('/getorderbook?')),
  R.map(queryString.stringify),
  R.map(parseParams),
  // @ts-ignore
  S.Right,
);
