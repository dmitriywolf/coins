import { Tabs, Typography } from 'antd';

import { Chart } from './Chart';
import classes from './style.module.css';

const { Title } = Typography;

export function CoinCharts({ charts = [] }) {
  const prices = charts?.prices;
  const marketCaps = charts?.market_caps;

  const dataPrices = prices?.map((item) => ({ x: item[0], y: item[1] }));
  const dataMarkets = marketCaps?.map((item) => ({ x: item[0], y: item[1] }));

  const items = [
    {
      label: 'Change Price in Month',
      key: '1',
      children: <Chart data={dataPrices} title={'Price'} />,
    },

    {
      label: 'Change Market Cap in Month',
      key: '2',
      children: <Chart data={dataMarkets} title={'Market Cap'} />,
    },
  ];

  return (
    <div className={classes.tabs}>
      <Title level={2} type='secondary'>
        Graphs
      </Title>
      <Tabs defaultActiveKey='1' items={items} />
    </div>
  );
}
