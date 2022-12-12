import { Button, Empty } from 'antd';
import Head from 'next/head';
import React from 'react';

import classes from '../styles/ErrorPage.module.css';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404: Not Found</title>
      </Head>
      <div className={`${classes.errorPage} page`}>
        <Empty
          image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
          imageStyle={{
            height: 300,
          }}
          description={
            <p className={classes.text}>404: This page could not be found</p>
          }
        >
          <div className={classes.btn}>
            <Button type='primary' size='large' shape='round' href='/'>
              Go To Main Page
            </Button>
          </div>
        </Empty>
      </div>
    </>
  );
}
