import { Divider } from 'antd';

import { CompareIcon, Container, CurrencySelect, Logo, Menu } from '../../';
import classes from './styles.module.css';

export function Header() {
  return (
    <header className={classes.headerWrap}>
      <Container>
        <div className={classes.header}>
          <Logo />
          <Divider
            type='vertical'
            style={{
              height: '100%',
              width: '2px',
              margin: '0 20px',
              background: '#B1B5C4',
            }}
          />
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
