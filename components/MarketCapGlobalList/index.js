import { Card, List, Typography } from 'antd';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

import classes from './styles.module.scss';

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

const { Title, Text } = Typography;

const ListItem = forwardRef(({ coin, percentage }, ref) => (
  <li className={classes.item} ref={ref}>
    <Text strong>{coin.toUpperCase()}</Text>
    <Text strong type='secondary'>
      {percentage} %
    </Text>
  </li>
));

ListItem.displayName = 'ListName';
const MotionListItem = motion(ListItem);

export default function MarketCapGlobalList({ percentage }) {
  const data = [];

  for (const prop in percentage) {
    data.push({
      coin: prop,
      percentage: Math.round(percentage[prop] * 100) / 100,
    });
  }

  return (
    <Card>
      <Title level={3}>Total Cap %</Title>
      <List
        dataSource={data}
        renderItem={({ coin, percentage }, idx) => (
          <MotionListItem
            initial='hidden'
            animate='visible'
            variants={variants}
            custom={idx}
            coin={coin}
            percentage={percentage}
          />
        )}
      ></List>
    </Card>
  );
}
