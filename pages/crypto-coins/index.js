import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Table, Typography } from 'antd';
import Head from 'next/head';
import React, { useState } from 'react';

import { getTopList } from '@/api';
import Container from '@/components/Container';
import Loader from '@/components/Loader';
import Navigation from '@/components/Navigation';
import { cryptoCoinsColumn } from '@/configs/table-crypto-coins';
import { cryptoCoinsConnector } from '@/connectors/crypto-coins';
import { useCurrencyContext } from '@/context';
import { useGetTopListQuery } from '@/hooks';

export { COMPARE_LINK } from '@/common/constant';

const { Title } = Typography;

export default function CryptoCoinsPage() {
  const [page, setPage] = useState(0);

  const { currency } = useCurrencyContext();
  const { value: currencyValue } = currency;

  const { data: coinsList, isLoading } = useGetTopListQuery({
    variables: {
      page,
      tsym: currencyValue,
    },
  });

  const coinsData = cryptoCoinsConnector(coinsList);

  const breadcrumbs = [{ title: 'Crypto Coins' }];

  return (
    <>
      <Head>
        <title>Crypto Coins</title>
        <meta
          name='description'
          content='Top Coin List according to https://min-api.cryptocompare.com/'
        />
      </Head>
      <div className='page'>
        <Container>
          <Navigation crumbs={breadcrumbs} />
          <Title>Crypto Coins</Title>
          <Loader active={isLoading} size='large'>
            <Table
              columns={cryptoCoinsColumn}
              dataSource={coinsData}
              pagination={{
                total: coinsList?.MetaData?.Count || 100,
                showSizeChanger: false,
                pageSize: 10,
                onChange: (page) => setPage(page - 1),
                position: ['topRight'],
              }}
              scroll={{
                x: 1100,
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

  await queryClient.prefetchQuery(['topList', [0, 10, 'USD']], () =>
    getTopList({ page: 0, limit: 10, tsym: 'USD' }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
