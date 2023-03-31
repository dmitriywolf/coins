import { Layout, theme, Typography } from 'antd';

import classes from './styles.module.scss';

const { Footer } = Layout;
const { Text } = Typography;
const { useToken } = theme;

export default function AppFooter() {
  const {
    token: { colorBorder, colorBgContainer },
  } = useToken();

  return (
    <Footer
      className={classes.footer}
      style={{
        padding: 0,
        fontSize: 16,
        borderColor: colorBorder,
        backgroundColor: colorBgContainer,
      }}
    >
      <Text type='secondary' strong>
        © 2023 CRYPTO COINS
        <span className={classes.subtitle}>COMPARE</span>
      </Text>
    </Footer>
  );
}
