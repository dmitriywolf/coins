import { Typography } from 'antd';
import Link from 'next/link';

import classes from './Logo.module.css';

export const Logo = () => {
  return (
    <div className={classes.logo}>
      <Link href='/' component={Typography.Link}>
        CoinMarket
      </Link>
    </div>
  );
};
