import 'antd/dist/antd.css';
import '../styles/globals.css';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

import { Layout } from '../components';
import { CompareProvider, CurrencyProvider } from '../context';

export default function MyApp({ Component, pageProps }) {
  // This ensures that data is not shared
  // between different users and requests
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CurrencyProvider>
          <CompareProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CompareProvider>
        </CurrencyProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
