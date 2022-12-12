import { DeleteOutlined } from '@ant-design/icons';
import { Button, Image, Space, Tooltip, Typography } from 'antd';
import React from 'react';

import { useCompareContext } from '../../context';
import classes from './styles.module.css';

const { Title, Text } = Typography;

export function CompareGraphList() {
  const { coinsGraph, removeCoin } = useCompareContext();

  const removeFromCompareHandler = (id) => {
    removeCoin({ coin: { id }, isGraph: true });
  };

  return (
    <div className={classes.compareCoins}>
      {coinsGraph.map(({ id, image, name, symbol }) => (
        <div key={id} className={classes.compareCoin}>
          <Space>
            <Image src={image} alt={name} preview={false} />
            <div className={classes.title}>
              <Title level={4}>{name} /</Title>
              <Text type='secondary'>{symbol}</Text>
            </div>
          </Space>
          <div className={classes.removeBtnWrap}>
            <Tooltip title='Remove Coin'>
              <Button
                type='primary'
                icon={<DeleteOutlined />}
                shape='circle'
                onClick={() => removeFromCompareHandler(id)}
              />
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
}
