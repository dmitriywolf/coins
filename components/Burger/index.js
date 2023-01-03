import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

import classes from './styles.module.scss';

export function Burger() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={classes.burger}>
      <Button
        icon={isOpen ? <CloseOutlined /> : <MenuOutlined />}
        onClick={toggleMenuHandler}
      />
    </div>
  );
}
