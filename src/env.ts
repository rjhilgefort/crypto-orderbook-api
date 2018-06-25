import dotenv from 'dotenv';
import { complement, is, where } from 'ramda';
import { isPopulatedString } from './utils';

dotenv.config();

export const isValid = (env: object): boolean =>
  where({
    EXCHANGE_BITTREX_HOST: isPopulatedString,
    EXCHANGE_BITTREX_PREFIX: is(String),
    EXCHANGE_POLONIEX_HOST: isPopulatedString,
    EXCHANGE_POLONIEX_PREFIX: is(String),
  })(env);

export const notValid = complement(isValid);
