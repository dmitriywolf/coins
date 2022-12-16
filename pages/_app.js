import 'antd/dist/antd.css';
import '../styles/globals.css';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import { useState } from 'react';

import { Layout } from '../components';
import { CompareProvider, CurrencyProvider } from '../context';

export default function MyApp({ Component, pageProps, router }) {
  // This ensures that data is not shared
  // between different users and requests
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CurrencyProvider>
          <CompareProvider>
            <Head>
              <title>Crypto Coins Compare App</title>
              <meta
                name='viewport'
                content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
              />
              <meta
                property='og:url'
                content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
              />
              <meta property='og:locale' content='en_GB' />
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CompareProvider>
        </CurrencyProvider>
      </Hydrate>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
