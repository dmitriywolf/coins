import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

import { useCompareContext } from '../../context';
import classes from './styles.module.css';

export function CompareAction({ row: coin, isGraph }) {
  const { addCoin, removeCoin, coinExist } = useCompareContext();

  const addToCompareHandler = (event) => {
    event.stopPropagation();
    addCoin({ coin, isGraph });
  };

  const removeFromCompareHandler = (event) => {
    event.stopPropagation();
    removeCoin({ coin, isGraph });
  };

  return (
    <>
      {coinExist({ coin, isGraph }) ? (
        <div className={classes.remove}>
          <Button
            type='primary'
            shape='round'
            icon={<MinusCircleOutlined />}
            onClick={removeFromCompareHandler}
          >
            Compare
          </Button>
        </div>
      ) : (
        <div className={classes.add}>
          <Button
            type='primary'
            shape='round'
            icon={<PlusCircleOutlined />}
            onClick={addToCompareHandler}
          >
            Compare
          </Button>
        </div>
      )}
    </>
  );
}
