import { Typography } from 'antd';

import CompareAction from '@/components/CompareAction';
import Change from '@/components/TableComponents/Change';
import CoinName from '@/components/TableComponents/CoinName';
import TableSupply from '@/components/TableComponents/TableSupply';
import { formatNumber } from '@/utils';

const { Text } = Typography;

export const marketCoinsColumn = ({ currencySymbol }) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 130,
    render: (_, { rank, image, name, symbol }) => (
      <CoinName rank={rank} name={name} image={image} symbol={symbol} />
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 135,
    render: (_, { price }) => (
      <Text>{`${currencySymbol} ${formatNumber(price)}`}</Text>
    ),
  },
  {
    title: '24h %',
    dataIndex: 'price_change_percentage_24h',
    key: 'price_change_percentage_24h',
    width: 90,
    render: (_, { price_change_percentage_24h }) => (
      <Change value={price_change_percentage_24h} />
    ),
  },
  {
    title: `24h ${currencySymbol}`,
    dataIndex: 'price_change_24h',
    key: 'price_change_24h',
    width: 90,
    render: (_, { price_change_24h }) => (
      <Change value={price_change_24h} suffix={currencySymbol} />
    ),
  },
  {
    title: '7d %',
    dataIndex: 'price_change_percentage_7d',
    key: 'price_change_percentage_7d',
    width: 90,
    render: (_, { price_change_percentage_7d }) => (
      <Change value={price_change_percentage_7d} />
    ),
  },
  {
    title: '30d %',
    dataIndex: 'price_change_percentage_30d',
    key: 'price_change_percentage_30d',
    width: 90,
    render: (_, { price_change_percentage_30d }) => (
      <Change value={price_change_percentage_30d} />
    ),
  },
  {
    title: 'Market Cap',
    dataIndex: 'market_cap',
    key: 'market_cap',
    width: 160,
    render: (_, { market_cap }) => (
      <Text>{`${currencySymbol} ${formatNumber(market_cap)}`}</Text>
    ),
  },
  {
    title: 'Supply',
    dataIndex: 'circulating_supply',
    key: 'circulating_supply',
    width: 180,
    render: (_, { symbol, circulating_supply, max_supply }) => (
      <TableSupply
        symbol={symbol}
        current={circulating_supply}
        max={max_supply}
      />
    ),
  },
  {
    title: 'Compare',
    dataIndex: 'compare',
    key: 'compare',
    width: 130,
    render: (_, row) => <CompareAction row={row} isGraph={true} />,
  },
];
