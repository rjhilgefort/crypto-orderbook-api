import { AxiosResponse } from 'axios';
import queryString from 'query-string';
import * as R from 'ramda';
import tr from 'treis';
import S from '../sanctuary';
import {
  FetchOrderbook,
  FetchOrderbookParams,
  Orderbook,
} from '../types/exchanges';
import { notNil, PromiseReject, thenP, throwT } from '../utils';
import { exchangeGet } from './request';

export interface OrderbookResponse {
  success: boolean;
  message: string;
  result: Orderbook;
}

const {
  EXCHANGE_BITTREX_HOST: host,
  EXCHANGE_BITTREX_PREFIX: prefix,
}: {
  host: string;
  prefix: string;
} = process.env;

const dataProp = R.prop('data');

const bittrexGet = (path: string): AxiosResponse =>
  R.compose(
    thenP(R.when(R.pathEq(['success'], false), throwT)),
    exchangeGet({ host, prefix }),
  )(path);

const parseParams = R.applySpec({
  market: R.compose(
    R.replace('_', '-'),
    R.prop('market'),
  ),
  type: R.always('both'),
});

type NormalizeOrderbookResponse = (OrderbookResponse) => Orderbook;
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
  S.either(PromiseReject)(bittrexGet),
  R.map(R.concat('/getorderbook?')),
  R.map(queryString.stringify),
  R.map(parseParams),
  S.Right,
);
