import { Card, Col, Divider, Progress, Row, Space, Typography } from 'antd';
import { Change } from 'components/TableComponents';
import { useCurrencyContext } from 'context';
import { formatNumber } from 'utils/formatNumber';

import classes from './styles.module.scss';

const { Text } = Typography;

export function CoinMarketData({ market }) {
  const {
    name,
    symbol,
    high24h,
    low24h,
    marketCap,
    marketCapChangePercentage24hInCurrency,
    currentPrice,
    priceChangePercentage24hInCurrency,
    circulatingSupply,
    maxSupply,
  } = market;

  const { currency } = useCurrencyContext();

  const percentage =
    ((currentPrice?.[currency.valueLow] - low24h?.[currency.valueLow]) /
      (high24h?.[currency.valueLow] - low24h?.[currency.valueLow])) *
    100;

  let percentageSupply = null;

  if (maxSupply && circulatingSupply) {
    percentageSupply = (circulatingSupply / maxSupply) * 100;
  }

  return (
    <Card className={classes.card}>
      <Row gutter={[16, 16]} align='stretch'>
        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 12 }}>
          <Space direction='vertical'>
            <Text>{`Price ${name} (${symbol?.toUpperCase()}):`}</Text>
            <Space>
              <h3 className={classes.price}>
                {currency.symbol}
                {formatNumber(currentPrice?.[currency.valueLow])}
              </h3>
              <Change
                value={priceChangePercentage24hInCurrency?.[currency.valueLow]}
              />
            </Space>
            <Space>
              <Text type='secondary'>{currentPrice?.['btc']} BTC</Text>
              <Change value={priceChangePercentage24hInCurrency?.['btc']} />
            </Space>
          </Space>

          <div className={classes.changePrice}>
            <Text type='secondary'>Min: </Text>
            <Text type='danger'>
              {currency.symbol}
              {`${formatNumber(low24h?.[currency.valueLow])}`}
            </Text>

            <Progress
              percent={100}
              success={{
                percent: percentage,
                strokeColor: '#18B04D',
              }}
              strokeColor='#c7c2c9c6'
              showInfo={false}
            />

            <Text type='secondary'>Max: </Text>
            <Text type='success'>
              {currency.symbol}
              {`${formatNumber(high24h?.[currency.valueLow])}`}
            </Text>
            <Text strong>/ 24h</Text>
          </div>
        </Col>

        <Col xs={{ span: 0 }} xl={{ span: 1 }}>
          <Divider type='vertical' style={{ height: '100%' }} />
        </Col>

        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 11 }}>
          <Space>
            <Text strong>Market Cap:</Text>
            <Text type='secondary' strong>
              {formatNumber(marketCap?.[currency.valueLow])} {currency.symbol}
            </Text>
            <Change
              value={
                marketCapChangePercentage24hInCurrency?.[currency.valueLow]
              }
            />
          </Space>
          <div className={classes.supply}>
            <div className={classes.supplySection}>
              <Text strong>Supply</Text>
              {percentageSupply ? (
                <Text type='secondary'>
                  {Math.round(percentageSupply * 100) / 100} %
                </Text>
              ) : null}
            </div>

            {percentageSupply && (
              <Progress
                percent={Math.round(percentageSupply)}
                showInfo={false}
                strokeColor='#108ee9'
              />
            )}

            <div className={classes.supplySection}>
              <Text>Circulating Supply:</Text>
              <Text type='secondary'>
                {formatNumber(Math.round(circulatingSupply))}{' '}
                {symbol?.toUpperCase()}
              </Text>
            </div>
            {maxSupply ? (
              <div className={classes.supplySection}>
                <Text>Max Supply:</Text>
                <Text type='secondary'>
                  {formatNumber(Math.round(maxSupply))} {symbol?.toUpperCase()}
                </Text>
              </div>
            ) : null}
          </div>
        </Col>
      </Row>
    </Card>
  );
}
