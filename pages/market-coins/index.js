import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Table, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { getCoinsMarkets } from '@/api';
import Container from '@/components/Container';
import Loader from '@/components/Loader';
import Navigation from '@/components/Navigation';
import { marketCoinsColumn } from '@/configs/table-market-coins';
import { marketCoinsConnector } from '@/connectors/market-coins';
import { useCurrencyContext } from '@/context';
import { useGetCoinsMarketsQuery, useGetGlobalInfoQuery } from '@/hooks';
import classes from '@/styles/MarketCoinsPage.module.scss';

const { Title } = Typography;

export default function MarketCoinsPage() {
  const [page, setPage] = useState(1);

  const { currency } = useCurrencyContext();
  const { value: currencyValue, symbol: currencySymbol } = currency;

  const router = useRouter();

  const { data: global } = useGetGlobalInfoQuery();
  const { data, isLoading } = useGetCoinsMarketsQuery({
    variables: {
      vs_currency: currencyValue,
      page,
    },
  });

  const columns = useMemo(
    () => marketCoinsColumn({ currencySymbol }),
    [currencySymbol],
  );

  function navToCoin(id) {
    router.push(`/market-coins/${id}`, undefined, { shallow: true });
  }

  const breadcrumbs = [{ title: 'Market Coins' }];

  return (
    <>
      <Head>
        <title>Market Coins</title>
        <meta
          name='description'
          content='List of all cryptocurrencies that are available on the market'
        />
      </Head>
      <div className={`${classes.coinsPage} page`}>
        <Container>
          <Navigation crumbs={breadcrumbs} />
          <Title>Market Coins</Title>
          <Loader active={isLoading} size='large'>
            <Table
              columns={columns}
              dataSource={marketCoinsConnector(data)}
              rowClassName='tableRow'
              pagination={{
                total: global?.data?.active_cryptocurrencies || 100,
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
              scroll={{
                x: 1300,
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
