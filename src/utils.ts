import { complement, isNil } from 'ramda';

export const notNil = complement(isNil);
