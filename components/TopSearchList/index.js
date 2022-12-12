import { Card, List, Typography } from 'antd';

import { ListItem } from './ListItem';
import classes from './styles.module.css';

const { Title } = Typography;

export function TopSearchList({ list }) {
  const dataTops = list?.coins?.map(({ item }) => ({
    id: item.id,
    name: item.name,
    priceBTC: item.price_btc,
    symbol: item.symbol,
    image: item.large,
    rank: item.market_cap_rank,
  }));

  return (
    <Card className={classes.card}>
      <Title level={3}>Top by searched</Title>
      <List
        dataSource={dataTops}
        renderItem={({ id, name, priceBTC, symbol, image, rank }) => (
          <ListItem
            id={id}
            name={name}
            priceBTC={priceBTC}
            symbol={symbol}
            image={image}
            rank={rank}
          />
        )}
      ></List>
    </Card>
  );
}
