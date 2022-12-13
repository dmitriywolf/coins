import { Col, Row } from 'antd';
import React from 'react';

import { useCompareContext } from '../../context';
import { CompareTopItem } from './CompareTopItem';
import classes from './styles.module.css';

export function CompareTop() {
  const { coins } = useCompareContext();

  return (
    <div className={classes.row}>
      <Row align='stretch' gutter={[10, 10]}>
        {coins.map(({ fullName, image, symbol, internal }) => (
          <Col
            xs={{ span: 12 }}
            sm={{ span: 8 }}
            lg={{ span: 6 }}
            xl={{ span: 4 }}
            key={internal}
          >
            <CompareTopItem
              fullName={fullName}
              image={image}
              symbol={symbol}
              internal={internal}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
