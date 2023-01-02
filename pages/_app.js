import 'antd/dist/reset.css';
import 'styles/globals.scss';
import 'styles/variables.scss';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppLayout } from 'components';
import { CompareProvider, CurrencyProvider, ThemeProvider } from 'context';
import Head from 'next/head';
import { useState } from 'react';

export default function MyApp({ Component, pageProps, router }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CurrencyProvider>
          <CompareProvider>
            <ThemeProvider>
              <Head>
                <title>Crypto Coins Compare App</title>
                <meta
                  property='og:url'
                  content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
                />
                <meta property='og:locale' content='en_GB' />
              </Head>
              <AppLayout>
                <Component {...pageProps} />
              </AppLayout>
            </ThemeProvider>
          </CompareProvider>
        </CurrencyProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
