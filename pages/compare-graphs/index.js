import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import Head from 'next/head';
import Link from 'next/link';

import CompareGraphList from '@/components/CompareGraphList';
import Container from '@/components/Container';
import EmptyCompare from '@/components/EmptyCompare';
import Navigation from '@/components/Navigation';
import { useCompareContext, useCurrencyContext } from '@/context';
import { useGetCoinsChartsQueries } from '@/hooks';
import classes from '@/styles/CompareGraphsPage.module.scss';

const { Title } = Typography;

export default function CompareGraphsPage() {
  const { currency } = useCurrencyContext();
  const { coinsGraph, countGraph } = useCompareContext();
  const coinsIds = coinsGraph?.map((item) => item.id);

  const dataCharts = useGetCoinsChartsQueries({
    ids: coinsIds,
    currency: currency.value,
  });

  const data = dataCharts.map((item) => ({
    prices: item.data?.prices.slice(0, 700),
    volumes: item.data?.total_volumes.slice(0, 700),
  }));

  const timesTicks = data?.[0]?.prices?.map((item) => item[0]);
  console.log(timesTicks);

  // const dataPrices = data?.map((coin, idx) => {
  //   const obj = {};
  //   obj.coin = coinsGraph[idx];
  //   obj.data = coin?.prices?.map((item, idx) => ({
  //     x: timesTicks?.[idx],
  //     y: item[1],
  //   }));
  //   return obj;
  // });

  // const isSuccess =
  //   dataCharts?.filter((item) => item?.isSuccess === true).length ===
  //   coinsGraph.length;
  // const isLoading = dataCharts?.filter(
  //   (item) => item?.isLoading === true,
  // ).length;

  // const dataVolumes = data?.map((coin, idx) => {
  //   const obj = {};
  //   obj.coin = coinsGraph[idx];
  //   obj.data = coin?.volumes?.map((item, idx) => ({
  //     x: timesTicks?.[idx],
  //     y: item[1],
  //   }));
  //   return obj;
  // });

  const breadcrumbs = [{ title: 'Compare in Graphs' }];
  return (
    <>
      <Head>
        <title>Compare coins in graphs</title>
        <meta
          name='description'
          content='Page for comparing cryptocurrencies by market in graph, price and total values'
        />
      </Head>
      <div className='page'>
        <Container>
          <Navigation crumbs={breadcrumbs} />
          <Title>Compare in Graphs</Title>
          {countGraph ? (
            <>
              <div className={classes.actions}>
                <Link href={'/market-coins'}>
                  <Button
                    type='primary'
                    shape='round'
                    icon={<PlusCircleOutlined />}
                  >
                    Add more coins
                  </Button>
                </Link>
              </div>
              <CompareGraphList />
              <div className={classes.graphWrap}>
                <Title type='secondary' level={3}>
                  Price in 30 days
                </Title>
                {/* <Loader active={isLoading} size='large'>
                  {isSuccess && (
                    <MultiGraph
                      charts={dataPrices}
                      title='Price'
                      type='price'
                    />
                  )}
                </Loader> */}
              </div>

              <div className={classes.graphWrap}>
                <Title type='secondary' level={3}>
                  Total Volume in 30 days
                </Title>
                {/* <Loader active={isLoading} size='large'>
                  {isSuccess && (
                    <MultiGraph
                      charts={dataVolumes}
                      title='Volumes'
                      type='volume'
                    />
                  )}
                </Loader> */}
              </div>
            </>
          ) : (
            <EmptyCompare
              link='/market-coins'
              text='There are no coins to compare. Please choose any one from the Coins table'
            />
          )}
        </Container>
      </div>
    </>
  );
}
