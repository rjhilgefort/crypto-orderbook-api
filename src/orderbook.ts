import * as R from 'ramda';
import * as bittrex from './lib/bittrex';
import * as poloniex from './lib/poloniex';
import { CombinedOrderbook } from './types/exchanges';
import { PromiseAll, thenP } from './utils';

// TODO: Figure out type
// type KeyByRate = (string) => (Orders) => { [key: string]: Order };
const keyByRate = (name: any) =>
  R.reduce(
    (acc, { Rate, Quantity }) => R.assoc(Rate, { Quantity, name }, acc),
    {},
  );

const keyExchangeBooksByRate = R.mapObjIndexed(
  (exchange: any, exchangeName: string) =>
    R.map(keyByRate(exchangeName), exchange),
);

const mergeBooks = R.compose(
  R.reduce(R.mergeWith(R.mergeWith(R.pair)), { asks: {}, bids: {} }),
  R.values,
);

type FetchOrderbook = (FetchOrderbookParams) => Promise<CombinedOrderbook>;
const fetchOrderbook: FetchOrderbook = R.compose(
  thenP(
    R.compose(
      // @ts-ignore
      R.map(R.sortBy(R.nth(0))),
      R.map(R.toPairs),
      // @ts-ignore
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
