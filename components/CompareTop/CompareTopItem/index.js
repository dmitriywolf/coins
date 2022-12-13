import {
  DeleteTwoTone,
  getTwoToneColor,
  setTwoToneColor,
} from '@ant-design/icons';
import { Button, Image, Tooltip } from 'antd';
import React from 'react';

import { useCompareContext } from '../../../context';
import classes from './styles.module.css';

export function CompareTopItem({ fullName, image, internal }) {
  const { removeCoin } = useCompareContext();

  const removeFromCompareHandler = () => {
    removeCoin({ coin: { internal }, isGraph: false });
  };

  setTwoToneColor('#fa9f9f');

  return (
    <div className={classes.card}>
      <div className={classes.titleWrap}>
        <Image src={image} alt={fullName} preview={false} />
        <h3 className={classes.title}>{fullName}</h3>
      </div>

      <div className={classes.removeBtnWrap}>
        <Tooltip title='Remove Coin'>
          <Button
            type='primary'
            shape='circle'
            icon={<DeleteTwoTone />}
            twoToneColor={getTwoToneColor()}
            onClick={removeFromCompareHandler}
          />
        </Tooltip>
      </div>
    </div>
  );
}
