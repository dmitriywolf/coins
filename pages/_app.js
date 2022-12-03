import 'antd/dist/antd.css';
import '../styles/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Layout } from '../components';
import { CurrencyProvider } from '../context';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CurrencyProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
