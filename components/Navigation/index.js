import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

import classes from './styles.module.scss';

const { Item } = Breadcrumb;

export function Navigation({ crumbs, separator = '>' }) {
  return (
    <div className={classes.navigationWrap}>
      <Breadcrumb separator={separator}>
        <Item href='/' className={classes.homeIcon}>
          <HomeOutlined />
        </Item>
        {crumbs?.map(({ path, icon, title }) => (
          <Item
            href={path ? path : undefined}
            key={title}
            className={classes.item}
          >
            {icon ? icon : null}
            {title}
          </Item>
        ))}
      </Breadcrumb>
    </div>
  );
}
