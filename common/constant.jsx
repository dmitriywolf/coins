import CategoriesIcon from '../public/images/Categories.svg';
import CoinIcon from '../public/images/Coins.svg';
import TopListIcon from '../public/images/TopList.svg';

export const API_URL_CRYPTO = 'https://api.coingecko.com/api/v3/';
export const API_URL_COMPARE = 'https://min-api.cryptocompare.com/data';
export const COMPARE_LINK = 'https://www.cryptocompare.com';
export const API_COMPARE_KEY =
  '2d3a10f9bbe4ef6a3130394f6ee8c926c226f0dc31e96a4f9792c5e2e245fa3b';

export const BREAKPOINTS_CRYPTO = {
  coins: '/coins',
  coinsList: '/coins/list',
  coinsMarkets: '/coins/markets',
  categories: 'coins/categories',
  categoriesList: '/coins/categories/list',
  searchCrypto: '/search',
  trending: '/search/trending',
  global: '/global',
  exchanges: '/exchanges',
};

export const BREAKPOINTS_COMPARE = {
  topListByMarketCap: '/top/mktcapfull',
  pricemultiFull: '/pricemultifull',
};

export const CURRENCIES = [
  {
    title: 'US Dollar',
    value: 'USD',
    valueLow: 'usd',
    symbol: '$',
  },
  {
    title: 'Euro',
    value: 'EUR',
    valueLow: 'eur',
    symbol: '€',
  },
  {
    title: 'Ukrainian Hryvnia',
    value: 'UAH',
    valueLow: 'uah',
    symbol: '₴',
  },
  {
    title: 'Pound Sterling',
    value: 'GBP',
    valueLow: 'gbp',
    symbol: '£',
  },
  {
    title: 'Polish Złoty',
    value: 'PLN',
    valueLow: 'pln',
    symbol: 'ZŁ',
  },
];

export const PATHS = [
  {
    path: '/coins',
    title: 'Coins',
    icon: <CoinIcon />,
  },
  {
    path: '/top-list',
    title: 'Top-List',
    icon: <TopListIcon />,
  },
  {
    path: '/categories',
    title: 'Categories',
    icon: <CategoriesIcon />,
  },
];
