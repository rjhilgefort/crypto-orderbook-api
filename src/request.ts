import axios, { AxiosResponse } from 'axios';
import { notNil } from './utils';

export const GET = 'get';
export const POST = 'post';

export default (baseURL: string) => (url: string) => (
  data?: object,
): AxiosResponse =>
  axios({
    baseURL,
    data,
    method: notNil ? POST : GET,
    url,
  });
