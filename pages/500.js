import { Button, Empty } from 'antd';
import Head from 'next/head';

import classes from '@/styles/ErrorPage.module.scss';

export default function ServerErrorPage() {
  return (
    <>
      <Head>
        <title>500: Server Error Occured</title>
      </Head>
      <div className={`${classes.errorPage} page`}>
        <Empty
          image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
          description={
            <p className={classes.text}>500 - Server-side error occurred</p>
          }
        >
          <Button type='primary' size='large' shape='round' href='/'>
            Go To Main Page
          </Button>
        </Empty>
      </div>
    </>
  );
}
