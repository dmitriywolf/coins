import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { PATHS } from 'common/constant';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import classes from './styles.module.scss';

export function Menu() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={classes.navigation}>
      <div className={classes.burger}>
        <Button
          icon={isOpen ? <CloseOutlined /> : <MenuOutlined />}
          onClick={toggleMenuHandler}
        ></Button>
      </div>

      <nav className={`${classes.menu} ${isOpen ? 'open' : ''}`}>
        {PATHS.map(({ path, title, icon }) => (
          <div
            key={title}
            className={`${classes.link} ${
              router.asPath === path ? 'active' : ''
            }`}
          >
            {icon}
            <Link href={path}>{title}</Link>
          </div>
        ))}
      </nav>
    </div>
  );
}
