import { AxiosResponse } from 'axios';
import queryString from 'query-string';
import * as R from 'ramda';
import S from '../sanctuary';
import { FetchOrderbook, Orderbook } from '../types/exchanges';
import { notNil, PromiseReject, thenP, throwT } from '../utils';
import { getMarketParam } from './exchange-utils';
import { exchangeGet } from './request';

type RawOrders = Array<[string, number]>;

export interface OrderbookResponse {
  error?: string;
  asks: RawOrders;
  bids: RawOrders;
}

// @ts-ignore
const {
  EXCHANGE_POLONIEX_HOST: host,
  EXCHANGE_POLONIEX_PREFIX: prefix,
}: {
  EXCHANGE_POLONIEX_HOST: string;
  EXCHANGE_POLONIEX_PREFIX: string;
} = process.env;

const poloniexGet = (path: string): AxiosResponse =>
  R.compose(
    thenP(R.when(R.pathSatisfies(notNil, ['error']), throwT)),
    exchangeGet({ host, prefix }),
  )(path);

const parseParams = R.applySpec({
  command: R.always('returnOrderBook'),
  currencyPair: R.compose(
    R.replace('-', '_'),
    getMarketParam,
  ),
});

type NormalizeOrderbookResponse = (OrderbookResponse) => Orderbook;
// @ts-ignore
const normalizeOrderbookResponse: NormalizeOrderbookResponse = R.compose(
  R.map(R.map(R.zipObj(['Rate', 'Quantity']))),
  R.pick(['asks', 'bids']),
);

export const fetchOrderbook: FetchOrderbook = R.compose(
  thenP(normalizeOrderbookResponse),
  // @ts-ignore
  S.either(PromiseReject)(poloniexGet),
  R.map(R.concat('/?')),
  R.map(queryString.stringify),
  R.map(parseParams),
  // @ts-ignore
  S.Right,
);
