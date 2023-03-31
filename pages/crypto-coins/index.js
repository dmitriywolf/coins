import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Table, Typography } from 'antd';
import Head from 'next/head';
import React, { useState } from 'react';

import { getTopList } from '@/api';
import { COMPARE_LINK } from '@/common/constant';
import CompareAction from '@/components/CompareAction';
import Container from '@/components/Container';
import Loader from '@/components/Loader';
import Navigation from '@/components/Navigation';
import CoinName from '@/components/TableComponents/CoinName';
import { useCurrencyContext } from '@/context';
import { useGetTopListQuery } from '@/hooks';

export { COMPARE_LINK } from '@/common/constant';

const { Title, Text } = Typography;

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

  const coinsData = coinsList?.Data?.map((item) => {
    const currencyKey = item.DISPLAY ? Object.keys(item.DISPLAY)[0] : '';

    return {
      key: item.CoinInfo.Id,
      id: item.CoinInfo.Id,
      internal: item.CoinInfo.Internal,
      algorithm: item.CoinInfo.Algorithm,
      blockTime: item.CoinInfo.BlockTime,
      blockNumber: item.CoinInfo.BlockNumber,
      launchDate: item.CoinInfo.AssetLaunchDate,
      fullName: item.CoinInfo.FullName,
      symbol: item.CoinInfo.Name,
      proofType: item.CoinInfo.ProofType,
      image: `${COMPARE_LINK}${item.CoinInfo.ImageUrl}`,
      price: item.DISPLAY?.[currencyKey]?.PRICE || '-',
      highPrice24h: item.DISPLAY?.[currencyKey]?.HIGH24HOUR || '-',
      lowPrice24h: item.DISPLAY?.[currencyKey]?.LOW24HOUR || '-',
    };
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 130,
      render: (_, { fullName, symbol, image }) => (
        <CoinName name={fullName} image={image} symbol={symbol} />
      ),
    },
    {
      title: 'Launch Date',
      dataIndex: 'launchDate',
      key: 'launchDate',
      width: 120,
      render: (_, { launchDate }) => {
        const date = new Date(launchDate);
        return <Text>{date.toLocaleDateString()}</Text>;
      },
    },
    {
      title: 'Block Number/Time',
      dataIndex: 'block_number_time',
      key: 'block_number_time',
      width: 190,
      render: (_, { blockNumber, blockTime }) => {
        return (
          <div>
            {blockNumber ? <Text>{`${blockNumber} `}</Text> : '-'}/
            {blockTime ? (
              <Text type='secondary'>{` ${
                Math.round(blockTime * 100) / 100
              } sec`}</Text>
            ) : (
              '-'
            )}
          </div>
        );
      },
    },
    {
      title: 'Algorithm/Proof Type',
      dataIndex: 'algorithm_proof_type',
      key: 'algorithm_proof_type',
      width: 190,
      render: (_, { algorithm, proofType }) => (
        <div>
          <Text>{algorithm}</Text> / <Text type='secondary'>{proofType}</Text>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (_, { price }) => <Text>{price}</Text>,
    },
    {
      title: 'Low/High Price 24h',
      dataIndex: 'low_high_price',
      key: 'low_high_price',
      width: 190,
      render: (_, { lowPrice24h, highPrice24h }) => (
        <div>
          <Text type='danger'>{lowPrice24h}</Text> /
          <Text type='success'>{highPrice24h}</Text>
        </div>
      ),
    },
    {
      title: 'Compare',
      dataIndex: 'compare',
      key: 'compare',
      width: 150,
      render: (_, row) => <CompareAction row={row} />,
    },
  ];

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
              columns={columns}
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
