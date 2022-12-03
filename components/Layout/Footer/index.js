import { Typography } from 'antd';

import classes from './styles.module.css';

const { Text } = Typography;

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Text type='secondary' strong>
        © 2023 COINS MARKET
      </Text>
    </footer>
  );
}
