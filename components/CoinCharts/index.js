import {
  BarChartOutlined,
  DotChartOutlined,
  SlidersOutlined,
} from '@ant-design/icons';
import { Segmented, Typography } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import Loader from '@/components/Loader';

import classes from './style.module.scss';

const Chart = dynamic(() => import('./Chart'), { ssr: false });

const { Title } = Typography;

export default function CoinCharts({ charts = [], loading }) {
  const [selectedTab, setSelectedTab] = useState(1);
  const prices = charts?.prices;
  const marketCaps = charts?.market_caps;
  const totalVolumes = charts?.total_volumes;

  const dataPrices = prices?.map((item) => ({ x: item[0], y: item[1] }));
  const dataMarkets = marketCaps?.map((item) => ({ x: item[0], y: item[1] }));
  const dataVolumes = totalVolumes?.map((item) => ({ x: item[0], y: item[1] }));

  const changeTabHandler = (value) => {
    setSelectedTab(value);
  };

  return (
    <div className={classes.graphs}>
      <Title level={1} type='secondary'>
        Changes in 30 days
      </Title>

      <Segmented
        default={selectedTab}
        size='large'
        block
        options={[
          {
            label: 'Price',
            value: 1,
            icon: <BarChartOutlined />,
          },
          {
            label: 'Volume',
            value: 2,
            icon: <DotChartOutlined />,
          },
          {
            label: 'Cap',
            value: 3,
            icon: <SlidersOutlined />,
          },
        ]}
        onChange={changeTabHandler}
      />
      <Loader active={loading} size='large'>
        <div className={classes.wrapCharts}>
          {
            {
              1: (
                <>
                  {dataPrices && (
                    <Chart data={dataPrices} title='Price, ' type='price' />
                  )}
                </>
              ),
              2: (
                <>
                  {dataVolumes && (
                    <Chart
                      data={dataVolumes}
                      title='Total volume, MM'
                      type='volume'
                    />
                  )}
                </>
              ),
              3: (
                <>
                  {dataMarkets && (
                    <Chart
                      data={dataMarkets}
                      title='Market Cap MM'
                      type='marketCap'
                    />
                  )}
                </>
              ),
            }[selectedTab]
          }
        </div>
      </Loader>
    </div>
  );
}
