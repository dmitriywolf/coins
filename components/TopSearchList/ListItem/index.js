import { Avatar, Space, Tag, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';

import classes from './styles.module.css';

const { Text } = Typography;

export function ListItem({ id, name, priceBTC, symbol, image, rank }) {
  return (
    <Link href={`/coins/${id}`}>
      <div className={classes.item}>
        <Space>
          <Avatar src={image} />
          <Space direction='vertical'>
            <div className={classes.titleWrap}>
              <Tag color='#777E91'>Rank #{rank}</Tag>
              <p>
                <span className={classes.title}>{name}/</span>
                <span className={classes.symbol}>{symbol}</span>
              </p>
            </div>

            <p className={classes.priceWrap}>
              <Text strong>Price: </Text>
              <Text type='secondary'>{` ${priceBTC} BTC`}</Text>
            </p>
          </Space>
        </Space>
      </div>
    </Link>
  );
}
