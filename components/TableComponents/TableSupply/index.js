import { Popover, Progress, Typography } from 'antd';
import React from 'react';

import { formatNumber } from '../../../utils';
import classes from './styles.module.css';

const { Text } = Typography;

export function TableSupply({ symbol, current, max }) {
  if (!max) {
    return (
      <Text strong type='secondary'>
        {formatNumber(Math.round(current))} {symbol.toUpperCase()}
      </Text>
    );
  }

  const percentage = (current / max) * 100;

  const content = (
    <>
      <div className={classes.popoverLine}>
        <Text strong>Percentage</Text>
        <Text type='secondary'>{Math.round(percentage * 100) / 100} %</Text>
      </div>
      <Progress
        percent={Math.round(percentage)}
        showInfo={false}
        strokeColor='#3772FF'
      />
      <div className={classes.popoverLine}>
        <Text strong>Circulating Supply</Text>
        <Text type='secondary'>
          {formatNumber(Math.round(current))} {symbol.toUpperCase()}
        </Text>
      </div>
      <div className={classes.popoverLine}>
        <Text strong>Max Supply</Text>
        <Text type='secondary'>
          {formatNumber(Math.round(max))} {symbol.toUpperCase()}
        </Text>
      </div>
    </>
  );

  return (
    <Popover content={content}>
      <Text strong type='secondary'>
        {formatNumber(Math.round(current))} {symbol.toUpperCase()}
      </Text>
      <Progress
        percent={Math.round(percentage)}
        showInfo={false}
        strokeColor='#3772FF'
      />
    </Popover>
  );
}
