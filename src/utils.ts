import { allPass, complement, is, isEmpty, isNil } from 'ramda';

export const isNot = complement(is);
export const notNil = complement(isNil);
export const notEmpty = complement(isEmpty);
export const isPopulatedString = allPass([is(String), notEmpty]);

export const PromiseResolve = (x: any): Promise<any> => Promise.resolve(x);
export const PromiseReject = (x: any): Promise<any> => Promise.reject(x);
export const PromiseAll = (x: any): Promise<any> => Promise.all(x);

export const thenP = (success: any) => (promise: Promise<any>): any =>
  promise.then(success);
export const thenP2 = (success: any) => (error: any) => (
  promise: Promise<any>,
): Promise<any> => promise.then(success, error);
export const catchP = (error: any) => (promise: Promise<any>): Promise<any> =>
  promise.catch(error);

export const throwT = (x: any) => {
  throw x;
};
