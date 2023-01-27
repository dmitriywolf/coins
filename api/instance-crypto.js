import axios from 'axios';
import { API_URL_CRYPTO, BREAKPOINTS_CRYPTO } from 'common/constant';

const instanceCrypto = axios.create({
  baseURL: API_URL_CRYPTO,
  headers: {
    'Accept-Encoding': 'gzip,deflate,compress',
  },
});

instanceCrypto.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  },
);

export const getCoinsMarkets = async ({
  vs_currency,
  order = 'market_cap_desc',
  category,
  per_page = 10,
  page = 1,
  price_change_percentage = '24h,7d,30d',
}) => {
  let path = `${BREAKPOINTS_CRYPTO.coinsMarkets}?vs_currency=${vs_currency}&page=${page}&per_page=${per_page}&order=${order}&price_change_percentage=${price_change_percentage}`;
  if (category) {
    path = path.concat(`&category=${category}`);
  }
  const coins = await instanceCrypto.get(path);
  return coins.data;
};

export const getCategories = async (sort) => {
  const categories = await instanceCrypto.get(
    `${BREAKPOINTS_CRYPTO.categories}?order=${sort}`,
  );

  return categories.data;
};

export const getTopCoins = async () => {
  const topCoins = await instanceCrypto.get(BREAKPOINTS_CRYPTO.trending);

  return topCoins.data;
};

export const getGlobalInfo = async () => {
  const global = await instanceCrypto.get(BREAKPOINTS_CRYPTO.global);
  return global.data;
};

export const getCoinById = async (id) => {
  const coin = await instanceCrypto.get(`${BREAKPOINTS_CRYPTO.coins}/${id}`);
  return coin.data;
};

export const getCoinTickers = async (id) => {
  const coin = await instanceCrypto.get(
    `${BREAKPOINTS_CRYPTO.coins}/${id}/tickers?include_exchange_logo=true&page=1&order=volume_desc&depth=true`,
  );
  return coin.data;
};

export const getCoinChart = async ({ id, currency }) => {
  const chart = await instanceCrypto.get(
    `${BREAKPOINTS_CRYPTO.coins}/${id}/market_chart?vs_currency=${currency}&days=30days`,
  );

  return chart.data;
};

export const getExchanges = async ({ page = 0, per_page = 10 }) => {
  const exchanges = await instanceCrypto.get(
    `${BREAKPOINTS_CRYPTO.exchanges}?page=${page}&per_page=${per_page}`,
  );

  return exchanges.data;
};
