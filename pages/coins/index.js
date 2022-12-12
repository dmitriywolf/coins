import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Table, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { getCoinsMarkets } from '../../api';
import { CompareAction, Container, Loader, Navigation } from '../../components';
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
  const [page, setPage] = useState(1);

  const { currency } = useCurrencyContext();
  const { value: currencyValue, symbol: currencySymbol } = currency;

  const router = useRouter();

  const { data: coinsList } = useGetCoinsListQuery();

  const { data, isLoading } = useGetCoinsMarketsQuery({
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
    {
      title: 'Compare',
      dataIndex: 'compare',
      key: 'compare',
      render: (_, row) => <CompareAction row={row} isGraph={true} />,
    },
  ];

  function navToCoin(id) {
    router.push(`/coins/${id}`, undefined, { shallow: true });
  }

  const breadcrumbs = [{ title: 'Coins' }];

  return (
    <>
      <Head>
        <title>Coins</title>
        <meta
          name='description'
          content='List of all cryptocurrencies that are available on the market'
        />
      </Head>
      <div className={`${classes.coinsPage} page`}>
        <Container>
          <Navigation crumbs={breadcrumbs} />
          <Title>Coins</Title>
          <Loader active={isLoading} size='large' bg='#F4F5F6'>
            <Table
              columns={columns}
              dataSource={coinsData}
              rowClassName={classes.tableRow}
              pagination={{
                total: coinsList?.length || 100,
                showSizeChanger: false,
                pageSize: 10,
                onChange: (page) => setPage(page),
                position: ['topRight'],
              }}
              onRow={({ id }) => {
                return {
                  onClick: () => {
                    navToCoin(id);
                  },
                };
              }}
            />
          </Loader>
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['coinsMarkets', 'USD', 1], () =>
    getCoinsMarkets({
      vs_currency: 'USD',
      page: 1,
    }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
