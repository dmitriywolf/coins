import { Divider } from 'antd';

import { CompareIcon, Container, CurrencySelect, Logo, Menu } from '../../';
import classes from './styles.module.css';

export function Header() {
  return (
    <header className={classes.headerWrap}>
      <Container>
        <div className={classes.header}>
          <Logo />
          <Divider type='vertical' />
          <Menu />
          <div className={classes.actions}>
            <CompareIcon />
            <CompareIcon isGraph={true} />
            <CurrencySelect />
          </div>
        </div>
      </Container>
    </header>
  );
}
