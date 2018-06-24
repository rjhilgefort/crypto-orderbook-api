import dotenv, { DotenvResult } from 'dotenv';
import { complement, is, where } from 'ramda';
import { isPopulatedString } from './utils';

dotenv.config();

export const isValid: boolean = (env: ProcessEnv) =>
  where({
    EXCHANGE_BITTREX_HOST: isPopulatedString,
    EXCHANGE_BITTREX_HOST: is(String),
  });

export const notValid: boolean = complement(isValid);
