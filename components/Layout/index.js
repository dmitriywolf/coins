import { Layout } from 'antd';

import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

const { Content } = Layout;

export function AppLayout({ children }) {
  return (
    <Layout>
      <AppHeader />
      <Content style={{ paddingTop: 70, width: '100vw' }}>{children}</Content>
      <AppFooter />
    </Layout>
  );
}
