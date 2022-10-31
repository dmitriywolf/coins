import { Divider } from 'antd';

import { Menu } from '../..';
import { Container, Logo } from '../../UI';
import classes from './Header.module.css';

export const Header = () => {
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
        </div>
      </Container>
    </header>
  );
};
