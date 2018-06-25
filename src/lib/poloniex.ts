import { AxiosResponse } from 'axios';
import queryString from 'query-string';
import * as R from 'ramda';
import tr from 'treis';
import S from '../sanctuary';
import { FetchOrderbookParams, Orderbook } from '../types/exchanges';
import { notNil, PromiseReject, thenP, throwT } from '../utils';
import { exchangeGet } from './request';

type RawOrders = Array<Array<string, number>>;
interface OrderbookResponse {
  error?: string;
  asks: RawOrders;
  bids: RawOrders;
}

const {
  EXCHANGE_POLONIEX_HOST: host,
  EXCHANGE_POLONIEX_PREFIX: prefix,
}: {
  host: string;
  prefix: string;
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
    R.prop('market'),
  ),
});

type NormalizeOrderbookResponse = (OrderbookResponse) => Orderbook;
const normalizeOrderbookResponse: NormalizeOrderbookResponse = R.compose(
  R.map(R.map(R.zipObj(['Rate', 'Quantity']))),
  R.pick(['asks', 'bids']),
);

export const fetchOrderbook: FetchOrderbook = R.compose(
  thenP(normalizeOrderbookResponse),
  S.either(PromiseReject)(poloniexGet),
  R.map(R.concat('/?')),
  R.map(queryString.stringify),
  R.map(parseParams),
  S.Right,
);
