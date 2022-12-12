import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Select, Typography } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';

import { CURRENCIES } from '../../common/constant';
import {
  CompareBottom,
  CompareTop,
  Container,
  EmptyCompare,
  Navigation,
} from '../../components';
import { useCompareContext } from '../../context';
import { useGetMultiPriceQuery } from '../../hooks/queries';
import classes from '../../styles/ComparePage.module.css';

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
      </Head>
      <div className={`${classes.comparePage} page`}>
        <Container>
          <Navigation crumbs={breadcrumbs} />
          <Title>Compare Coins</Title>
          {count ? (
            <>
              <div className={classes.filterWrap}>
                <p className={classes.filterTitle}>Choise Currency</p>
                <Select
                  defaultValue={options[0]}
                  options={options}
                  placeholder={<p>Select sort..</p>}
                  className='customSelect'
                  popupClassName='customDropDowmMenuMulti'
                  maxTagCount='responsive'
                  onChange={changeCurrencyHandler}
                  style={{
                    width: 360,
                  }}
                  mode='multiple'
                  allowClear
                />

                <div className={classes.actions}>
                  <Link href={'/top-list'}>
                    <Button
                      type='primary'
                      shape='round'
                      icon={<PlusCircleOutlined />}
                    >
                      Add more coins
                    </Button>
                  </Link>
                </div>
              </div>
              <CompareTop />

              <CompareBottom data={data} isLoading={isLoading} />
            </>
          ) : (
            <EmptyCompare
              link='/top-list'
              text='There are no coins to compare. Please choose any one from the Top List'
            />
          )}
        </Container>
      </div>
    </>
  );
}