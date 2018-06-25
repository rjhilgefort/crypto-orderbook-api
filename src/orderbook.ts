import * as R from 'ramda';
import * as bittrex from './lib/bittrex';
import * as poloniex from './lib/poloniex';
import {
  CombindedOrderbook,
  FetchOrderbookParams,
  Orders,
} from './types/exchanges';
import { PromiseAll, thenP } from './utils';

// TODO: Figure out type
// type KeyByRate = (string) => (Orders) => { [key: string]: Order };
const keyByRate = name =>
  R.reduce(
    (acc, { Rate, Quantity }) => R.assoc(Rate, { Quantity, name }, acc),
    {},
  );

const keyExchangeBooksByRate = R.mapObjIndexed((exchange, exchangeName) =>
  R.map(keyByRate(exchangeName), exchange),
);

const mergeBooks = R.compose(
  R.reduce(R.mergeWith(R.mergeWith(R.pair)), { asks: {}, bids: {} }),
  R.values,
);

type FetchOrderbook = (FetchOrderbookParams) => CombindedOrderbook;
const fetchOrderbook: FetchOrderbook = R.compose(
  thenP(
    R.compose(
      R.map(R.sortBy(R.nth(0))),
      R.map(R.toPairs),
      R.map(R.map(R.unless(R.is(Array), R.of))),
      mergeBooks,
      keyExchangeBooksByRate,
      R.zipObj(['bittrex', 'poloniex']),
    ),
  ),
  PromiseAll,
  R.juxt([bittrex.fetchOrderbook, poloniex.fetchOrderbook]),
);

export default fetchOrderbook;
