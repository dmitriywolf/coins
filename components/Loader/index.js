import { Spin } from 'antd';
import React from 'react';

import classes from './styles.module.css';

export function Loader({
  children,
  active,
  size = 'default',
  text = 'Loading...',
  bg = 'transparent',
}) {
  return (
    <div className={classes.wrap}>
      {active ? (
        <>
          <div className={classes.loader}>
            <Spin size={size} tip={text} />
          </div>
          <div className={classes.overlay} style={{ background: bg }}></div>
        </>
      ) : null}
      <>{children}</>
    </div>
  );
}
