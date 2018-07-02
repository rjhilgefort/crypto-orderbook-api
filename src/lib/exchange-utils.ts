import * as R from 'ramda';

export const getMarketParam = R.compose(
  R.toUpper,
  R.defaultTo(''),
  R.prop('market'),
);
