import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Card, Col, Row, Space, Tabs, Typography } from 'antd';
import parse from 'html-react-parser';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { getCoinById, getCoinChart } from '@/api';
import CoinCharts from '@/components/CoinCharts';
import CoinIntro from '@/components/CoinIntro';
import CoinMarketData from '@/components/CoinMarketData';
import Container from '@/components/Container';
import Navigation from '@/components/Navigation';
import Tickers from '@/components/Tickers';
import { coinIntroConnector } from '@/connectors/coin-intro';
import { coinMarketConnector } from '@/connectors/coin-market';
import { useCurrencyContext } from '@/context';
import {
  useGetCoinByIdQuery,
  useGetCoinChartQuery,
  useGetCoinTickersQuery,
} from '@/hooks';
import classes from '@/styles/MarketCoinPage.module.scss';
import { capitelizeFirstLetter } from '@/utils';

const { Title, Text } = Typography;

export default function MarketCoinPage() {
  const {
    query: { id },
  } = useRouter();

  const { currency } = useCurrencyContext();
  const { data } = useGetCoinByIdQuery({ id });
  const { data: tickers } = useGetCoinTickersQuery({ id });
  const { data: charts, isLoading } = useGetCoinChartQuery({
    id,
    currency: currency.value,
  });

  const coinIntroData = coinIntroConnector(data);
  const coinMarketData = coinMarketConnector(data);

  const items = [
    {
      label: 'Overviev',
      key: '1',
      children: (
        <>
          {data?.description.en ? (
            <Row>
              <Card className={classes.description}>
                <div>
                  <Space>
                    <Title type='secondary'>{data?.name}</Title>
                  </Space>
                </div>
                <Text type='secondary'>
                  {data?.description.en ? parse(data?.description.en) : ''}
                </Text>
              </Card>
            </Row>
          ) : null}
          <CoinCharts charts={charts} loading={isLoading} />
        </>
      ),
    },
    {
      label: 'Tickers',
      key: '2',
      children: <Tickers list={tickers?.tickers} />,
    },
  ];

  const breadcrumbs = [
    { path: '/market-coins', title: 'Market Coins' },
    { title: `${capitelizeFirstLetter(id)}` },
  ];

  return (
    <>
      <Head>
        <title> Coin </title>
        <meta name='description' content={`Coin page: ${data?.name}`} />
      </Head>
      <div className='page'>
        <Container>
          <Navigation crumbs={breadcrumbs} />

          <Row gutter={[16, 16]}>
            <Col xs={{ span: 24 }} xl={{ span: 8 }}>
              <CoinIntro intro={coinIntroData} />
            </Col>

            <Col xs={{ span: 24 }} xl={{ span: 16 }}>
              <CoinMarketData market={coinMarketData} />
            </Col>
          </Row>

          <div className={classes.tabs}>
            <Tabs defaultActiveKey='1' items={items} />
          </div>
        </Container>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery(['coin', id], () => getCoinById(id));
    await queryClient.fetchQuery(['coinChart', id], () =>
      getCoinChart({ id, currency: 'USD' }),
    );
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }

  return {
    props: {
      // dehydrate query cache
      dehydratedState: dehydrate(queryClient),
    },
  };
};
