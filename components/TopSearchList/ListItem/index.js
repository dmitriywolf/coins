import { Avatar, Space, Tag, Typography } from 'antd';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { forwardRef } from 'react';

import classes from './styles.module.scss';

const { Text } = Typography;

const ListItem = forwardRef(
  ({ id, name, priceBTC, symbol, image, rank }, ref) => {
    return (
      <Link href={`/coins/${id}`}>
        <div className={classes.item} ref={ref}>
          <Space>
            <Avatar src={image} />
            <Space direction='vertical' size='small'>
              <div className={classes.titleWrap}>
                <Tag color='#777E91'>#{rank}</Tag>
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
  },
);

ListItem.displayName = 'ListItem';

export const MotionListItem = motion(ListItem);
