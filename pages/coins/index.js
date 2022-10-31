import Head from 'next/head';

import { Container, Navigation } from '../../components/UI';

export default function Coins() {
  const breadcrumbs = [{ title: 'Coins' }];

  return (
    <>
      <Head>
        <title>Coins</title>
        <meta name='description' content='Coins' />
      </Head>

      <Container>
        <Navigation crumbs={breadcrumbs} />
        <p>Coins table </p>
      </Container>
    </>
  );
}
