import { Typography } from 'antd';
import Link from 'next/link';

import LogoImg from '../../public/images/Logo.svg';
import classes from './styles.module.css';

const { Text } = Typography;

export function Logo() {
  return (
    <Link href='/'>
      <div className={classes.logo}>
        <LogoImg />
        <Text type='secondary'>
          CRYPTO <span className={classes.subtitle}>COMPARE</span>
        </Text>
      </div>
    </Link>
  );
}
