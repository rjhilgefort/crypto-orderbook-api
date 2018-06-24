import axios from 'axios';
import { notNil } from './utils';

export const GET = 'get';
export const POST = 'post';

export default (baseURL: string) => (url: string) => (data?: object) =>
  axios({
    baseURL,
    data,
    method: notNil(data) ? POST : GET,
    url,
  });
