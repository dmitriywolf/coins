import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Card, Col, Row, Space, Tabs, Typography } from 'antd';
import { getCoinById, getCoinChart } from 'api';
import {
  CoinCharts,
  CoinIntro,
  CoinMarketData,
  Container,
  Navigation,
  Tickers,
} from 'components';
import { useCurrencyContext } from 'context';
import {
  useGetCoinByIdQuery,
  useGetCoinChartQuery,
  useGetCoinTickersQuery,
} from 'hooks';
import parse from 'html-react-parser';
import Head from 'next/head';
import { useRouter } from 'next/router';
import classes from 'styles/MarketCoinPage.module.scss';
import { capitelizeFirstLetter } from 'utils';

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

  const coinIntroData = {
    name: data?.name,
    categories: data?.categories,
    algorith: data?.hashing_algorithm,
    genesis: data?.genesis_date,
    image: data?.image.small,
    rank: data?.market_cap_rank,
    symbol: data?.symbol,
    community: {
      facebook: data?.community_data?.facebook_likes,
      reddit_posts: data?.community_data?.reddit_average_posts_48h,
      twitter: data?.community_data?.twitter_followers,
    },
  };

  const coinMarketData = {
    name: data?.name,
    symbol: data?.symbol,
    high24h: data?.market_data.high_24h,
    low24h: data?.market_data.low_24h,
    marketCap: data?.market_data.market_cap,
    marketCapChangePercentage24hInCurrency:
      data?.market_data.market_cap_change_percentage_24h_in_currency,
    currentPrice: data?.market_data.current_price,
    priceChangePercentage24hInCurrency:
      data?.market_data.price_change_percentage_24h_in_currency,
    circulatingSupply: data?.market_data.circulating_supply,
    maxSupply: data?.market_data.max_supply,
  };

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
        <title>Coin: {data?.name}</title>
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
