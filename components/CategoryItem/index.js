import { Card, Image, Space, Typography } from 'antd';

import { formatNumber } from '../../utils';
import { Change } from '../TableComponents';
import classes from './styles.module.css';

const { Title, Text } = Typography;

export function CategoryItem({
  name,
  content,
  marketCap,
  topCoins,
  marketCapChange24h,
  volume24h,
}) {
  return (
    <Card className={classes.categoryCard}>
      <Space direction='vertical'>
        <Title level={3}>{name}</Title>
        <Space>
          <div>
            <Text strong>Market Cap: </Text>
            <Text type='secondary' strong>
              {formatNumber(marketCap)} $
            </Text>
          </div>
          <Space>
            <Text strong>Market Cap Chage in 24h: </Text>
            <Text type='secondary' strong>
              <Change value={marketCapChange24h} />
            </Text>
          </Space>
          <div>
            <Text strong>Volume in 24 h: </Text>
            <Text type='secondary' strong>
              {formatNumber(volume24h)} $
            </Text>
          </div>
        </Space>
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
  );
}
