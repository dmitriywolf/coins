import { Card, Space, Typography } from 'antd';
import Link from 'next/link';

import MarketsIcon from '../../public/images/Categories.svg';
import CoinsIcon from '../../public/images/Coins.svg';
import { formatNumber } from '../../utils';
import { Change } from '../TableComponents';
import classes from './styles.module.css';

const { Title, Text } = Typography;

export function MarketCapGlobal({
  active_cryptocurrencies,
  market_cap_change_percentage_24h_usd,
  markets,
}) {
  return (
    <Card className={classes.card}>
      <Title level={3}>Market Cap</Title>
      <div className={classes.inner}>
        <Space direction='vertical'>
          <Space>
            <Link href={'/coins'}>Active cryptocurrencies: </Link>
            <div className={classes.value}>
              <CoinsIcon />
              <Text type='secondary' strong>
                {formatNumber(active_cryptocurrencies)}
              </Text>
            </div>
          </Space>
          <Space>
            <Text strong>Change Market Cap in 24h: </Text>
            <Change value={market_cap_change_percentage_24h_usd} />
          </Space>
          <Space>
            <Text strong>Markets: </Text>
            <div className={classes.value}>
              <MarketsIcon />
              <Text type='secondary' strong>
                {markets}
              </Text>
            </div>
          </Space>
        </Space>
      </div>
    </Card>
  );
}