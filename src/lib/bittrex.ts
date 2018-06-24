import { AxiosResponse } from 'axios';
import queryString from 'query-string';
import {
  always,
  call,
  chain,
  compose,
  concat,
  defaultTo,
  evolve,
  map,
  pathEq,
  pickAll,
  prop,
  propSatisfies,
  unless,
  when,
} from 'ramda';
import tr from 'treis';
import S from '../sanctuary';
import {
  isPopulatedString,
  PromiseReject,
  thenP,
  thenP2,
  throwT,
} from '../utils';
import request from './request';

const {
  EXCHANGE_BITTREX_HOST: HOST,
  EXCHANGE_BITTREX_PREFIX: PREFIX,
}: {
  HOST: string;
  PREFIX: string;
} = process.env;

export type Orderbook = object;
export type Market = string;
export type Type = 'both';

const dataProp = prop('data');

const requestBittrex = (path: string): AxiosResponse =>
  compose(
    thenP2(dataProp)(
      compose(
        throwT,
        dataProp,
      ),
    ),
    thenP(when(pathEq(['data', 'success'], false), throwT)),
    thenP(unless(pathEq(['status'], 200), throwT)),
    call,
    request(HOST),
    concat(PREFIX),
  )(path);

interface FetchOrderbookParams {
  market: Market;
  type?: Type;
}
export const fetchOrderbook = (
  params: FetchOrderbookParams,
): Promise<Orderbook> => {
  return compose(
    S.either(PromiseReject)(requestBittrex),
    map(x => `/public/getorderbook?${x}`),
    map(queryString.stringify),
    map(evolve({ type: defaultTo('both') })),
    map(pickAll(['market', 'type'])),
    S.Right,
  )(params);
};
