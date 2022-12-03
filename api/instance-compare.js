import axios from 'axios';

import { API_URL_COMPARE, BREAKPOINTS_COMPARE } from '../common/constant';

// const API_KEY_COMPARE = `api_key=${process.env.COMPARE_API_KEY}`;

const instanceCompare = axios.create({
  baseURL: API_URL_COMPARE,
});

instanceCompare.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  },
);

export const getTopListByMarketCap = async ({
  page = 0,
  limit = 20,
  tsym = 'USD',
}) => {
  const topListByMarketCapData = await instanceCompare.get(
    `${BREAKPOINTS_COMPARE.topListByMarketCap}?page=${page}&limit=${limit}&tsym=${tsym}`,
  );
  return topListByMarketCapData.data;
};
