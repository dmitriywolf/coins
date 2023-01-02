import { Card, Image, Space, Typography } from 'antd';
import { Change } from 'components/TableComponents';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { formatNumber } from 'utils';

import classes from './styles.module.scss';

const { Title, Text } = Typography;

const CategoryItem = forwardRef(
  (
    { name, content, marketCap, topCoins, marketCapChange24h, volume24h },
    ref,
  ) => (
    <div ref={ref}>
      <Card className={classes.card}>
        <Space direction='vertical'>
          <Title level={3}>{name}</Title>
          <div className={classes.marketList}>
            <div className={classes.marketItem}>
              <Text strong>Market Cap:</Text>
              <Text type='secondary' strong>
                {formatNumber(marketCap)} $
              </Text>
            </div>
            <div className={classes.marketItem}>
              <Text strong>Market Cap Chage in 24h:</Text>
              <Text type='secondary' strong>
                <Change value={marketCapChange24h} />
              </Text>
            </div>
            <div className={classes.marketItem}>
              <Text strong>Volume in 24 h:</Text>
              <Text type='secondary' strong>
                {formatNumber(volume24h)} $
              </Text>
            </div>
          </div>
          {content ? <p className={classes.content}>{content}</p> : null}
          <Space>
            <Text strong>Top 3 Coins:</Text>
            <Space>
              {topCoins?.map((coin) => (
                <Image
                  key={coin}
                  src={coin}
                  alt={coin}
                  preview={false}
                  width={32}
                  height={32}
                />
              ))}
            </Space>
          </Space>
        </Space>
      </Card>
    </div>
  ),
);

CategoryItem.displayName = 'CategoryItem';
export const MotionCategoryItem = motion(CategoryItem);
