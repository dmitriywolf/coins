import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Sidebar } from 'components';
import { useState } from 'react';

import classes from './styles.module.scss';

export function Burger() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={classes.burger}>
        <Button
          icon={isOpen ? <CloseOutlined /> : <MenuOutlined />}
          onClick={toggleMenuHandler}
        />
      </div>
      <Sidebar isOpen={isOpen} closeHandler={closeMenu} />
    </>
  );
}
