import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Col, Row, Typography } from 'antd';
import { motion } from 'framer-motion';
import Head from 'next/head';

import { getGlobalInfo, getTopCoins, getTopExchanges } from '../api';
import {
  Container,
  MarketCapGlobal,
  MarketCapGlobalList,
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

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

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
        <meta property='og:title' content='Crypto Coins Compare Application' />
        <meta
          property='og:description'
          content='An app for viewing information about all cryptocurrencies with the ability to compare them.'
        />
        <meta property='og:image' content='/images/index.jpg' />
        <meta property='og:image:type' content='image/jpeg' />
        <meta property='og:image:width' content='300' />
        <meta property='og:image:height' content='176' />
        <meta
          property='og:image:alt'
          content='Main logo of the Crypto Coins Compare Application'
        />
      </Head>
      <div className={`${classes.homePage} page`}>
        <Container>
          <motion.div
            initial={'hidden'}
            animate={'visible'}
            transition={{ duration: 2 }}
            variants={variants}
            className={classes.mainBanner}
          >
            <LogoIcon />
            <Title>
              {`CRYPTO COINS `}
              <span className={classes.subtitle}>COMPARE</span>
            </Title>
          </motion.div>
          <Row gutter={[16, 16]}>
            <Col
              xs={{ span: 24, order: 2 }}
              md={{ span: 12 }}
              xl={{ span: 6, order: 1 }}
              xxl={{ span: 6 }}
            >
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
                    <MarketCapGlobalList
                      percentage={global?.data?.market_cap_percentage}
                    />
                  </Col>
                </Row>
              </div>
            </Col>

            <Col
              xs={{ span: 24, order: 3 }}
              xl={{ span: 10, order: 2 }}
              xxl={{ span: 12 }}
            >
              <TopExchanges exchages={exchages} />
            </Col>

            <Col
              xs={{ span: 24, order: 1 }}
              md={{ span: 12 }}
              xl={{ span: 8, order: 3 }}
              xxl={{ span: 6 }}
            >
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
