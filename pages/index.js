import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Col, Row, Typography } from 'antd';
import Head from 'next/head';

import { getGlobalInfo, getTopCoins, getTopExchanges } from '../api';
import {
  Container,
  MarketCapGlobal,
  MarketCapGlobalGraph,
  TopExchanges,
  TopSearchList,
} from '../components';
import {
  useGetGlobalInfoQuery,
  useGetTopCoinsQuery,
  useGetTopExchangesQuery,
} from '../hooks';
import LogoIcon from '../public/images/Logo.svg';
import classes from '../styles/HomePage.module.css';

const { Title } = Typography;

export default function HomePage() {
  const { data: tops } = useGetTopCoinsQuery();
  const { data: global } = useGetGlobalInfoQuery();
  const { data: exchages } = useGetTopExchangesQuery();

  return (
    <>
      <Head>
        <title>Crypto Coins Compare</title>
        <meta
          name='description'
          content='An app for viewing information about all cryptocurrencies with the ability to compare them.'
        />
      </Head>
      <div className={`${classes.homePage} page`}>
        <Container>
          <div className={classes.mainBanner}>
            <LogoIcon />
            <Title>
              {`CRYPTO COINS `}
              <span className={classes.subtitle}>COMPARE</span>
            </Title>
          </div>
          <Row gutter={16}>
            <Col span={6}>
              <div className={classes.leftSidebar}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <MarketCapGlobal
                      markets={global?.data?.markets}
                      active_cryptocurrencies={
                        global?.data?.active_cryptocurrencies
                      }
                      market_cap_change_percentage_24h_usd={
                        global?.data?.market_cap_change_percentage_24h_usd
                      }
                    />
                  </Col>
                  <Col span={24}>
                    <MarketCapGlobalGraph
                      percentage={global?.data?.market_cap_percentage}
                    />
                  </Col>
                </Row>
              </div>
            </Col>

            <Col span={12}>
              <TopExchanges exchages={exchages} />
            </Col>

            <Col span={6}>
              <div className={classes.rightSidebar}>
                <TopSearchList list={tops} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['topCoins'], () => getTopCoins());
  await queryClient.prefetchQuery(['globalInfo'], () => getGlobalInfo());
  await queryClient.prefetchQuery(['topExchanges'], () => getTopExchanges());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
