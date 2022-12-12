import { Button, Empty } from 'antd';
import Link from 'next/link';
import React from 'react';

import classes from './styles.module.css';

export function EmptyCompare({ link, text }) {
  return (
    <Empty
      image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
      imageStyle={{
        height: 200,
      }}
      description={<p className={classes.text}>{text}</p>}
    >
      <div className={classes.btn}>
        <Link href={link}>
          <Button type='primary' size='large' shape='round'>
            Select Coins to Compare
          </Button>
        </Link>
      </div>
    </Empty>
  );
}
