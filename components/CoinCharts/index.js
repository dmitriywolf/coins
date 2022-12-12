import {
  BarChartOutlined,
  DotChartOutlined,
  SlidersOutlined,
} from '@ant-design/icons';
import { Segmented, Typography } from 'antd';
import { useState } from 'react';

import { Loader } from '../Loader';
import { Chart } from './Chart';
import classes from './style.module.css';

const { Title } = Typography;

export function CoinCharts({ charts = [], loading }) {
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
      <Title level={2} type='secondary'>
        Graphs changes in 30 days
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
            label: 'Total Volume',
            value: 2,
            icon: <DotChartOutlined />,
          },
          {
            label: 'Market Cap',
            value: 3,
            icon: <SlidersOutlined />,
          },
        ]}
        onChange={changeTabHandler}
      />
      <Loader active={loading} size='large' bg='#F4F5F6'>
        <div className={classes.wrapCharts}>
          {
            {
              1: <Chart data={dataPrices} title='Price' type='price' />,
              2: (
                <Chart data={dataVolumes} title='Total Volume' type='volume' />
              ),
              3: (
                <Chart data={dataMarkets} title='Market Cap' type='marketCap' />
              ),
            }[selectedTab]
          }
        </div>
      </Loader>
    </div>
  );
}