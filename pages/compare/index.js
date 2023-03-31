import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Select, Typography } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

import { CURRENCIES } from '@/common/constant';
import CompareBottom from '@/components/CompareBottom';
import CompareList from '@/components/CompareList';
import Container from '@/components/Container';
import EmptyCompare from '@/components/EmptyCompare';
import Navigation from '@/components/Navigation';
import { useCompareContext } from '@/context';
import { useGetMultiPriceQuery } from '@/hooks';
import classes from '@/styles/ComparePage.module.scss';

const { Title } = Typography;

export default function ComparePage() {
  const { coins, count } = useCompareContext();
  const [tsyms, setTsyms] = useState('USD');

  const fsymsStr = coins.map((item) => item.internal).join(',');

  const { data, isLoading } = useGetMultiPriceQuery({
    variables: {
      fsyms: fsymsStr,
      tsyms: tsyms,
    },
  });

  const options = CURRENCIES.map(({ title, value, symbol }) => ({
    value,
    label: `${symbol} | ${title}`,
  }));

  const changeCurrencyHandler = (value) => {
    setTsyms(value);
  };

  const breadcrumbs = [{ title: 'Compare Coins' }];

  return (
    <>
      <Head>
        <title>Compare Coins</title>
        <meta
          name='description'
          content='Page for comparing cryptocurrencies by market'
        />
      </Head>
      <div className={`${classes.comparePage} page`}>
        <Container>
          <Navigation crumbs={breadcrumbs} />
          <Title>Compare Coins</Title>
          {count ? (
            <>
              <div className={classes.actionsWrap}>
                <div className={classes.select}>
                  <p className={classes.title}>Currency:</p>
                  <Select
                    defaultValue={options[0]}
                    options={options}
                    placeholder={<p>Select currency..</p>}
                    maxTagCount='responsive'
                    onChange={changeCurrencyHandler}
                    style={{
                      width: 220,
                    }}
                    mode='multiple'
                    allowClear
                  />
                </div>
                <Link href={'/crypto-coins'}>
                  <Button
                    type='primary'
                    shape='round'
                    icon={<PlusCircleOutlined />}
                  >
                    Add more coins
                  </Button>
                </Link>
              </div>
              <CompareList />
              <CompareBottom data={data} isLoading={isLoading} />
            </>
          ) : (
            <EmptyCompare
              link='/crypto-coins'
              text='There are no coins to compare. Please choose any one from the Top List'
            />
          )}
        </Container>
      </div>
    </>
  );
}
