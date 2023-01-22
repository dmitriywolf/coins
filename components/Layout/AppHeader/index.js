import { Divider, Layout, theme } from 'antd';
import {
  Burger,
  CompareIcon,
  Container,
  CurrencySelect,
  Logo,
  Menu,
  SwitchTheme,
} from 'components';

import classes from './styles.module.scss';

const { Header } = Layout;
const { useToken } = theme;

export function AppHeader() {
  const {
    token: { colorBgContainer },
  } = useToken();

  return (
    <Header
      className={classes.header}
      style={{ padding: 0, backgroundColor: colorBgContainer, height: '70px' }}
    >
      <Container>
        <div className={classes.headerInner}>
          <Logo />
          <Divider
            type='vertical'
            style={{ height: '100%', borderWidth: '2px', margin: '0 10px' }}
            className={classes.divider}
          />
          <Menu />
          <div className={classes.actions}>
            <CompareIcon />
            <CompareIcon isGraph={true} />
            <CurrencySelect />
          </div>
          <Divider
            type='vertical'
            style={{ height: '100%', borderWidth: '2px', margin: '0 10px' }}
            className={classes.dividerActions}
          />
          <SwitchTheme />
          <Burger />
        </div>
      </Container>
    </Header>
  );
}
