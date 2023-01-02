import { Card, List, Typography } from 'antd';

import { MotionListItem } from './ListItem';

const { Title } = Typography;

const variants = {
  visible: (i) => ({
    opacity: 1,
    transition: { delay: i * 0.2 },
    y: 0,
  }),
  hidden: {
    opacity: 0,
    y: -100,
  },
};

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
    <Card>
      <Title level={3}>Top by searched</Title>
      <List
        dataSource={dataTops}
        renderItem={({ id, name, priceBTC, symbol, image, rank }, idx) => (
          <MotionListItem
            initial='hidden'
            animate='visible'
            variants={variants}
            custom={idx}
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
