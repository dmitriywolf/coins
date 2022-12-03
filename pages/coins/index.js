import { Table, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Container, Navigation } from '../../components';
import {
  Change,
  CoinName,
  TableSupply,
} from '../../components/TableComponents';
import { useCurrencyContext } from '../../context';
import { useGetCoinsListQuery, useGetCoinsMarketsQuery } from '../../hooks';
import classes from '../../styles/CoinsPage.module.css';
import { formatNumber } from '../../utils';

const { Text, Title } = Typography;

export default function Coins() {
  const [totalItems, setTotalItems] = useState(100);
  const [page, setPage] = useState(0);

  const { currency } = useCurrencyContext();
  const { value: currencyValue, symbol: currencySymbol } = currency;

  const router = useRouter();

  useGetCoinsListQuery({
    onSuccess: (data) => {
      setTotalItems(data.length);
    },
  });

  const { data } = useGetCoinsMarketsQuery({
    variables: {
      vs_currency: currencyValue,
      page,
    },
  });

  const coinsData = data?.map((item) => ({
    key: item.id,
    id: item.id,
    rank: item.market_cap_rank,
    name: item.name,
    symbol: item.symbol,
    image: item.image,
    price: item.current_price,
    price_change_percentage_24h: item.price_change_percentage_24h,
    price_change_24h: item.price_change_24h,
    price_change_percentage_7d: item.price_change_percentage_7d_in_currency,
    price_change_percentage_30d: item.price_change_percentage_30d_in_currency,
    market_cap: item.market_cap,
    circulating_supply: item.circulating_supply,
    max_supply: item.max_supply,
  }));

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, { image, name, symbol }) => (
        <CoinName name={name} image={image} symbol={symbol} />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (_, { price }) => (
        <Text>{`${currencySymbol} ${formatNumber(price)}`}</Text>
      ),
    },
    {
      title: '24h %',
      dataIndex: 'price_change_percentage_24h',
      key: 'price_change_percentage_24h',
      render: (_, { price_change_percentage_24h }) => (
        <Change value={price_change_percentage_24h} />
      ),
    },
    {
      title: `24h ${currencySymbol}`,
      dataIndex: 'price_change_24h',
      key: 'price_change_24h',
      render: (_, { price_change_24h }) => (
        <Change value={price_change_24h} suffix={currencySymbol} />
      ),
    },
    {
      title: '7d %',
      dataIndex: 'price_change_percentage_7d',
      key: 'price_change_percentage_7d',
      render: (_, { price_change_percentage_7d }) => (
        <Change value={price_change_percentage_7d} />
      ),
    },
    {
      title: '30d %',
      dataIndex: 'price_change_percentage_30d',
      key: 'price_change_percentage_30d',
      render: (_, { price_change_percentage_30d }) => (
        <Change value={price_change_percentage_30d} />
      ),
    },
    {
      title: 'Market Cap',
      dataIndex: 'market_cap',
      key: 'market_cap',
      render: (_, { market_cap }) => (
        <Text>{`${currencySymbol} ${formatNumber(market_cap)}`}</Text>
      ),
    },
    {
      title: 'Circulating Supply',
      dataIndex: 'circulating_supply',
      key: 'circulating_supply',
      render: (_, { symbol, circulating_supply, max_supply }) => (
        <TableSupply
          symbol={symbol}
          current={circulating_supply}
          max={max_supply}
        />
      ),
    },
  ];

  function navToCoin(id) {
    router.push(`/coins/${id}`);
  }

  const breadcrumbs = [{ title: 'Coins' }];

  return (
    <>
      <Head>
        <title>Coins</title>
        <meta name='description' content='Coins' />
      </Head>
      <div className={`${classes.coinsPage} page`}>
        <Container>
          <Navigation crumbs={breadcrumbs} />
          <Title>Coins</Title>
          <Table
            columns={columns}
            dataSource={coinsData}
            rowClassName={classes.tableRow}
            pagination={{
              total: totalItems,
              showSizeChanger: false,
              pageSize: 20,
              onChange: (page) => setPage(page),
              position: ['bottomCenter'],
            }}
            onRow={({ id }) => {
              return {
                onClick: () => {
                  navToCoin(id);
                },
              };
            }}
          />
        </Container>
      </div>
    </>
  );
}
