import { allPass, complement, is, isEmpty, isNil } from 'ramda';

export const notNil = complement(isNil);
export const notEmpty = complement(isEmpty);
export const isPopulatedString = allPass([is(String), notEmpty]);

export const PromiseResolve = (x: any): Promise => Promise.resolve(x);
export const PromiseReject = (x: any): Promise => Promise.reject(x);

export const thenP = (success: function) => (promise: Promise): Promise =>
  promise.then(success);
export const thenP2 = (success: function) => (error: function) => (
  promise: Promise,
): Promise => promise.then(success, error);
export const catchP = (error: function) => (promise: Promise): Promise =>
  promise.catch(error);

export const throwT = (x: any) => {
  throw x;
};
