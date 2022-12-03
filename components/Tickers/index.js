import { Table, Typography } from 'antd';

import { formatNumber } from '../../utils';
import { ConfidenceTag, MarketName, Pair } from '../TableComponents';
import classes from './styles.module.css';

const { Title, Text } = Typography;

export function Tickers({ list = [] }) {
  const tickersData = list?.map((item) => ({
    key: item.trade_url,
    base: item.base,
    last: item.last,
    target: item.target,
    tradeUrl: item.trade_url,
    trustScore: item.trust_score,
    marketName: item.market.name,
    marketLogo: item.market.logo,
    marketIdentifier: item.market.identifier,
    volumeUSD: item.converted_volume.usd,
    costToMoveDown: item.cost_to_move_down_usd,
    costToMoveUp: item.cost_to_move_up_usd,
    time: item.timestamp,
  }));

  const columns = [
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      render: (_, { marketName, marketLogo }) => (
        <MarketName name={marketName} image={marketLogo} />
      ),
    },
    {
      title: 'Pairs',
      dataIndex: 'pairs',
      key: 'pairs',
      render: (_, { base, target, tradeUrl }) => (
        <Pair base={base} target={target} url={tradeUrl} />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (_, { last }) => <Text>{`$ ${formatNumber(last)}`}</Text>,
    },
    {
      title: '+2% Depth',
      dataIndex: 'costToMoveDown',
      key: 'costToMoveDown',
      render: (_, { costToMoveDown }) => (
        <Text>{`$ ${formatNumber(costToMoveDown)}`}</Text>
      ),
    },
    {
      title: '-2% Depth',
      dataIndex: 'costToMoveUp',
      key: 'costToMoveUp',
      render: (_, { costToMoveUp }) => (
        <Text>{`$ ${formatNumber(costToMoveUp)}`}</Text>
      ),
    },
    {
      title: 'Volume',
      dataIndex: 'volumeUSD',
      key: 'volumeUSD',
      render: (_, { volumeUSD }) => (
        <Text>{`$ ${formatNumber(volumeUSD)}`}</Text>
      ),
    },
    {
      title: 'Confidence',
      dataIndex: 'trustScore',
      key: 'trustScore',
      render: (_, { trustScore }) => <ConfidenceTag score={trustScore} />,
    },
    {
      title: 'Time',
      dataIndex: 'Time',
      key: 'time',
      render: (_, { time }) => <Text>{new Date(time).toLocaleString()}</Text>,
    },
  ];

  function navToDeal(url) {
    window.open(url, '_blank');
  }

  return (
    <div className={classes.tickers}>
      <Title>Last 100 Tickers by Volume</Title>
      <Table
        columns={columns}
        dataSource={tickersData}
        rowClassName={classes.tableRow}
        pagination={{
          showSizeChanger: false,
          pageSize: 20,
          position: ['bottomCenter'],
        }}
        onRow={({ tradeUrl }) => {
          return {
            onClick: () => {
              navToDeal(tradeUrl);
            },
          };
        }}
      />
    </div>
  );
}
