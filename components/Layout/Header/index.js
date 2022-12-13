import { Divider } from 'antd';
import { motion } from 'framer-motion';

import { CompareIcon, Container, CurrencySelect, Logo, Menu } from '../../';
import classes from './styles.module.css';

const variants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export function Header() {
  return (
    <motion.header
      initial={'hidden'}
      animate={'visible'}
      transition={{ duration: 1 }}
      variants={variants}
      className={classes.headerWrap}
    >
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
    </motion.header>
  );
}
