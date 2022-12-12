import { Card, List, Typography } from 'antd';

import classes from './styles.module.css';

const { Title, Text } = Typography;
const ListItem = ({ coin, percentage }) => (
  <div className={classes.item}>
    <Text strong>{coin.toUpperCase()}</Text>
    <Text strong type='secondary'>
      {percentage} %
    </Text>
  </div>
);

export function MarketCapGlobalGraph({ percentage }) {
  const data = [];

  for (const prop in percentage) {
    data.push({
      coin: prop,
      percentage: Math.round(percentage[prop] * 100) / 100,
    });
  }

  return (
    <Card className={classes.card}>
      <Title level={3}>Total Cap %</Title>
      <List
        dataSource={data}
        renderItem={({ coin, percentage }) => (
          <ListItem coin={coin} percentage={percentage} />
        )}
      ></List>
    </Card>
  );
}
