import { Table, Typography } from 'antd';

import MarketName from '@/components/TableComponents/MarketName';
import Pair from '@/components/TableComponents/Pair';
import ConfidenceTag from '@/components/Tags/ConfidenceTag';
import { formatNumber } from '@/utils';

const { Title, Text } = Typography;

export default function Tickers({ list = [] }) {
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
      fixed: 'left',
      width: 190,
      render: (_, { marketName, marketLogo }) => (
        <MarketName name={marketName} image={marketLogo} />
      ),
    },
    {
      title: 'Pairs',
      dataIndex: 'pairs',
      key: 'pairs',
      width: 120,
      render: (_, { base, target, tradeUrl }) => (
        <Pair base={base} target={target} url={tradeUrl} />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (_, { last }) => <Text>{`$ ${formatNumber(last)}`}</Text>,
    },
    {
      title: '+2% Depth',
      dataIndex: 'costToMoveDown',
      key: 'costToMoveDown',
      width: 150,
      render: (_, { costToMoveDown }) => (
        <Text>{`$ ${formatNumber(costToMoveDown)}`}</Text>
      ),
    },
    {
      title: '-2% Depth',
      dataIndex: 'costToMoveUp',
      key: 'costToMoveUp',
      width: 150,
      render: (_, { costToMoveUp }) => (
        <Text>{`$ ${formatNumber(costToMoveUp)}`}</Text>
      ),
    },
    {
      title: 'Volume',
      dataIndex: 'volumeUSD',
      key: 'volumeUSD',
      width: 150,
      render: (_, { volumeUSD }) => (
        <Text>{`$ ${formatNumber(volumeUSD)}`}</Text>
      ),
    },
    {
      title: 'Confidence',
      dataIndex: 'trustScore',
      key: 'trustScore',
      width: 120,
      render: (_, { trustScore }) => <ConfidenceTag score={trustScore} />,
    },
    {
      title: 'Time',
      dataIndex: 'Time',
      key: 'time',
      width: 150,
      render: (_, { time }) => <Text>{new Date(time).toLocaleString()}</Text>,
    },
  ];

  function navToDeal(url) {
    window.open(url, '_blank');
  }

  return (
    <>
      <Title>Last Tickers by Volume</Title>
      <Table
        columns={columns}
        dataSource={tickersData}
        rowClassName='tableRow'
        pagination={{
          showSizeChanger: false,
          pageSize: 20,
          position: ['topRight'],
        }}
        onRow={({ tradeUrl }) => {
          return {
            onClick: () => {
              navToDeal(tradeUrl);
            },
          };
        }}
        scroll={{
          x: 1100,
        }}
      />
    </>
  );
}
