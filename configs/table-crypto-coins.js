import { Typography } from 'antd';

import CompareAction from '@/components/CompareAction';
import CoinName from '@/components/TableComponents/CoinName';

const { Text } = Typography;

export const cryptoCoinsColumn = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 130,
    render: (_, { fullName, symbol, image }) => (
      <CoinName name={fullName} image={image} symbol={symbol} />
    ),
  },
  {
    title: 'Launch Date',
    dataIndex: 'launchDate',
    key: 'launchDate',
    width: 120,
    render: (_, { launchDate }) => {
      const date = new Date(launchDate);
      return <Text>{date.toLocaleDateString()}</Text>;
    },
  },
  {
    title: 'Block Number/Time',
    dataIndex: 'block_number_time',
    key: 'block_number_time',
    width: 190,
    render: (_, { blockNumber, blockTime }) => {
      return (
        <div>
          {blockNumber ? <Text>{`${blockNumber} `}</Text> : '-'}/
          {blockTime ? (
            <Text type='secondary'>{` ${
              Math.round(blockTime * 100) / 100
            } sec`}</Text>
          ) : (
            '-'
          )}
        </div>
      );
    },
  },
  {
    title: 'Algorithm/Proof Type',
    dataIndex: 'algorithm_proof_type',
    key: 'algorithm_proof_type',
    width: 190,
    render: (_, { algorithm, proofType }) => (
      <div>
        <Text>{algorithm}</Text> / <Text type='secondary'>{proofType}</Text>
      </div>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 120,
    render: (_, { price }) => <Text>{price}</Text>,
  },
  {
    title: 'Low/High Price 24h',
    dataIndex: 'low_high_price',
    key: 'low_high_price',
    width: 190,
    render: (_, { lowPrice24h, highPrice24h }) => (
      <div>
        <Text type='danger'>{lowPrice24h}</Text> /
        <Text type='success'>{highPrice24h}</Text>
      </div>
    ),
  },
  {
    title: 'Compare',
    dataIndex: 'compare',
    key: 'compare',
    width: 150,
    render: (_, row) => <CompareAction row={row} />,
  },
];
