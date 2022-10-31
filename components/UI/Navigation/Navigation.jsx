import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

import classes from './Navigation.module.css';

const { Item } = Breadcrumb;

export const Navigation = ({ crumbs, separator = '>' }) => {
  return (
    <div className={classes.navigationWrap}>
      <Breadcrumb separator={separator}>
        <Item href='/'>
          <HomeOutlined />
        </Item>
        {crumbs?.map(({ path, icon, title }) => (
          <Item href={path ? path : undefined} key={title}>
            {icon ? icon : null}
            {title}
          </Item>
        ))}
      </Breadcrumb>
    </div>
  );
};
