import { Col, Row, Typography } from 'antd';
import Head from 'next/head';

import {
  Container,
  MarketCapGlobal,
  MarketCapGlobalGraph,
  TopExchanges,
  TopSearchList,
} from '../components';
import {
  useGetExchangesQuery,
  useGetGlobalInfoQuery,
  useGetTopCoinsQuery,
} from '../hooks';
import LogoIcon from '../public/images/Logo.svg';
import classes from '../styles/HomePage.module.css';

const { Title } = Typography;

export default function HomePage() {
  const { data: tops } = useGetTopCoinsQuery();
  const { data: global } = useGetGlobalInfoQuery();
  const { data: exchages } = useGetExchangesQuery({ variables: {} });

  return (
    <>
      <Head>
        <title>Coins Market</title>
      </Head>
      <div className={`${classes.homePage} page`}>
        <Container>
          <div className={classes.mainBanner}>
            <LogoIcon />
            <Title>COINS MARKET APP</Title>
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
