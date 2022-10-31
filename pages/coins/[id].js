import Head from 'next/head';
import React from 'react';

import { Container, Navigation } from '../../components/UI';

export default function CoinPage() {
  const breadcrumbs = [
    { path: '/coins', title: 'Coins' },
    { title: 'Coin Page' },
  ];

  return (
    <>
      <Head>
        <title>Coins Table</title>
        <meta name='description' content='Coins table' />
      </Head>

      <Container>
        <Navigation crumbs={breadcrumbs} />

        <h1>CoinPage</h1>
      </Container>
    </>
  );
}
