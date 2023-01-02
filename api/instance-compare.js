import axios from 'axios';
import { API_URL_COMPARE, BREAKPOINTS_COMPARE } from 'common/constant';

const instanceCompare = axios.create({
  baseURL: API_URL_COMPARE,
  headers: {
    'Accept-Encoding': 'gzip,deflate,compress',
  },
});

instanceCompare.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  },
);

export const getTopList = async ({ page = 0, limit = 10, tsym = 'USD' }) => {
  const topListByMarketCapData = await instanceCompare.get(
    `${BREAKPOINTS_COMPARE.topListByMarketCap}?page=${page}&limit=${limit}&tsym=${tsym}`,
  );
  return topListByMarketCapData.data;
};

export const getMultiPriceData = async ({ fsyms, tsyms = 'USD' }) => {
  const multiPriceData = await instanceCompare.get(
    `${BREAKPOINTS_COMPARE.pricemultiFull}?fsyms=${fsyms}&tsyms=${tsyms}`,
  );
  return multiPriceData.data;
};
