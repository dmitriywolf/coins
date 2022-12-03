import { Divider } from 'antd';

import { Container, CurrencySelect, Logo, Menu } from '../../';
import classes from './styles.module.css';

export function Header() {
  return (
    <header className={classes.headerWrap}>
      <Container>
        <div className={classes.header}>
          <Logo />
          <Divider
            type='vertical'
            style={{ height: '100%', margin: '0 20px' }}
          />
          <Menu />
          <div className={classes.actions}>
            <CurrencySelect />
          </div>
        </div>
      </Container>
    </header>
  );
}
