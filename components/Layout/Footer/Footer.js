import { Space, Typography } from 'antd';

import { Container } from '../../UI';
import classes from './Footer.module.css';

const { Text, Link } = Typography;

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Container>
        <div className={classes.footerInner}>
          <Space>
            <Text type='secondary'>©2022 Created by </Text>
            <Link href='https://www.malevich.com.ua/' strong target='_blank'>
              Malevich Web Development
            </Link>
          </Space>
        </div>
      </Container>
    </footer>
  );
};
