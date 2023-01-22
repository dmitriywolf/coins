import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, theme } from 'antd';
import { Logo, Menu } from 'components';

import classes from './styles.module.scss';

const { useToken } = theme;

export function Sidebar({ isOpen, closeHandler }) {
  const {
    token: { colorBgLayout },
  } = useToken();

  return (
    <Drawer
      placement='left'
      onClose={closeHandler}
      open={isOpen}
      width='100%'
      bodyStyle={{
        padding: '15px 0 0 0',
        backgroundColor: colorBgLayout,
      }}
      extra={<Logo sidebar={true} />}
      closeIcon={
        <Button
          icon={<CloseOutlined />}
          onClick={closeHandler}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}
        />
      }
      rootClassName={classes.sidebar}
    >
      <Menu sidebar={true} />
    </Drawer>
  );
}
