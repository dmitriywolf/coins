import { LineChartOutlined, SlidersOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import Link from 'next/link';
import React from 'react';

import { useCompareContext } from '../../context';
import classes from './styles.module.css';

export function CompareIcon({ isGraph }) {
  const { count, countGraph } = useCompareContext();

  return (
    <div className={classes.wrap}>
      <Badge
        count={isGraph ? countGraph : count}
        offset={[2, 4]}
        color={isGraph ? '#18B04D' : '#F43F3F'}
      >
        <Link href={isGraph ? '/compare-graphs' : '/compare'}>
          <div className={classes.icon}>
            {isGraph ? <LineChartOutlined /> : <SlidersOutlined />}
          </div>
        </Link>
      </Badge>
    </div>
  );
}
