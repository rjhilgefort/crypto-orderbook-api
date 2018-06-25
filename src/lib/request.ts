import axios from 'axios';
import * as R from 'ramda';
import {
  isPopulatedString,
  notNil,
  PromiseReject,
  thenP,
  thenP2,
  throwT,
} from '../utils';

export const GET = 'get';
export const POST = 'post';

const dataProp = R.prop('data');

export const request = (baseURL: string) => (url: string) => (data?: object) =>
  axios({
    baseURL,
    data,
    method: notNil(data) ? POST : GET,
    url,
  });

export const exchangeGet = ({
  host,
  prefix,
}: {
  host: string;
  prefix: string;
}) => (path: string) =>
  R.compose(
    thenP2(dataProp)(
      R.compose(
        throwT,
        dataProp,
      ),
    ),
    thenP(R.unless(R.pathEq(['status'], 200), throwT)),
    R.call,
    request(host),
    R.concat(prefix),
  )(path);
