import { Table, Typography } from 'antd';
import Head from 'next/head';
import React, { useState } from 'react';

import { COMPARE_LINK } from '../../common/constant';
import { Container, Navigation } from '../../components';
import { CoinName } from '../../components/TableComponents';
import { useCurrencyContext } from '../../context';
import { useGetTopListCoinsCompareQuery } from '../../hooks';
import classes from '../../styles/TopListPage.module.css';

export { COMPARE_LINK } from '../../common/constant';

const { Title, Text } = Typography;

export default function TopListPage() {
  const [totalItems, setTotalItems] = useState(100);
  const [page, setPage] = useState(0);

  const { currency } = useCurrencyContext();
  const { value: currencyValue } = currency;

  const { data: coinsList } = useGetTopListCoinsCompareQuery({
    variables: {
      tsym: currencyValue,
      page,
    },
    onSuccess: (data) => {
      setTotalItems(data.MetaData.Count);
    },
  });
  const breadcrumbs = [{ title: 'Top-List' }];

  const coinsData = coinsList?.Data?.map((item) => {
    const currencyKey = Object.keys(item?.DISPLAY)[0];

    return {
      key: item.CoinInfo.Id,
      id: item.CoinInfo.Id,
      algorithm: item.CoinInfo.Algorithm,
      blockTime: item.CoinInfo.BlockTime,
      blockNumber: item.CoinInfo.BlockNumber,
      launchDate: item.CoinInfo.AssetLaunchDate,
      fullName: item.CoinInfo.FullName,
      symbol: item.CoinInfo.Name,
      proofType: item.CoinInfo.ProofType,
      image: `${COMPARE_LINK}${item.CoinInfo.ImageUrl}`,
      highPrice24h: item.DISPLAY[currencyKey].HIGH24HOUR,
      lowPrice24h: item.DISPLAY[currencyKey].LOW24HOUR,
      price: item.DISPLAY[currencyKey].PRICE,
      volume24: item.DISPLAY[currencyKey].VOLUME24HOURTO,
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
      title: 'Volume 24h',
      dataIndex: 'volume_24h',
      key: 'volume_24h',
      render: (_, { volume24 }) => <Text>{volume24}</Text>,
    },
  ];

  return (
    <>
      <Head>
        <title>Compare</title>
      </Head>
      <div className={`${classes.topListPage} page`}>
        <Container>
          <Navigation crumbs={breadcrumbs} />
          <Title>Top List</Title>
          <Table
            columns={columns}
            dataSource={coinsData}
            pagination={{
              total: totalItems,
              showSizeChanger: false,
              pageSize: 20,
              onChange: (page) => setPage(page),
              position: ['bottomCenter'],
            }}
          />
        </Container>
      </div>
    </>
  );
}
