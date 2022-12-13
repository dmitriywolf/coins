import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Table, Typography } from 'antd';
import Head from 'next/head';
import React, { useState } from 'react';

import { getTopList } from '../../api';
import { COMPARE_LINK } from '../../common/constant';
import { CompareAction, Container, Loader, Navigation } from '../../components';
import { CoinName } from '../../components/TableComponents';
import { useCurrencyContext } from '../../context';
import { useGetTopListQuery } from '../../hooks';
import classes from '../../styles/TopListPage.module.css';

export { COMPARE_LINK } from '../../common/constant';

const { Title, Text } = Typography;

export default function TopListPage() {
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
      render: (_, { fullName, symbol, image }) => (
        <CoinName name={fullName} image={image} symbol={symbol} />
      ),
    },
    {
      title: 'Launch Date',
      dataIndex: 'launchDate',
      key: 'launchDate',
      render: (_, { launchDate }) => {
        const date = new Date(launchDate);
        return <Text>{date.toLocaleDateString()}</Text>;
      },
    },
    {
      title: 'Block Number/Time',
      dataIndex: 'block_number_time',
      key: 'block_number_time',
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
      render: (_, { price }) => <Text>{price}</Text>,
    },
    {
      title: 'Low/High Price 24h',
      dataIndex: 'low_high_price',
      key: 'low_high_price',
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
      render: (_, row) => <CompareAction row={row} />,
    },
  ];

  const breadcrumbs = [{ title: 'Top-List' }];

  return (
    <>
      <Head>
        <title>Top List</title>
        <meta
          name='description'
          content='Top Coin List according to https://min-api.cryptocompare.com/'
        />
      </Head>
      <div className={`${classes.topListPage} page`}>
        <Container>
          <Navigation crumbs={breadcrumbs} />
          <Title>Top List</Title>
          <div className={classes.tableWrap}></div>
          <Loader active={isLoading} size='large' bg='#F4F5F6'>
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
