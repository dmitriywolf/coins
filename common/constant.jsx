import CategoriesIcon from '@/public/images/Categories.svg';
import CoinIcon from '@/public/images/Coins.svg';
import TopListIcon from '@/public/images/TopList.svg';

export const API_URL_CRYPTO = process.env.NEXT_PUBLIC_API_URL_CRYPTO;
export const API_URL_COMPARE = process.env.NEXT_PUBLIC_API_URL_COMPARE;
export const COMPARE_LINK = process.env.NEXT_PUBLIC_COMPARE_LINK;

export const BREAKPOINTS_CRYPTO = {
  coins: '/coins',
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
    path: '/market-coins',
    title: 'Market Coins',
    icon: <CoinIcon />,
  },
  {
    path: '/crypto-coins',
    title: 'Crypto Coins',
    icon: <TopListIcon />,
  },
  {
    path: '/categories',
    title: 'Categories',
    icon: <CategoriesIcon />,
  },
];

export const CATEGORIES_SORT_OPTIONS = [
  {
    value: 'market_cap_desc',
    label: 'Market Cap ↓',
  },
  {
    value: 'market_cap_asc',
    label: 'Market Cap ↑',
  },
  {
    value: 'name_desc',
    label: 'Name ↓',
  },
  {
    value: 'name_asc',
    label: 'Name ↑',
  },
  {
    value: 'market_cap_change_24h_desc',
    label: 'Change in 24h ↓',
  },
  {
    value: 'market_cap_change_24h_asc',
    label: 'Change in 24h ↑',
  },
];
