import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

import Sidebar from '@/components/Sidebar';

import classes from './styles.module.scss';

export default function Burger() {
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
