import Head from 'next/head';

import { Container } from '../components/UI';

export default function Main() {
  return (
    <>
      <Head>
        <title>Coins market</title>
        <meta name='description' content='Coins table' />
      </Head>

      <Container>
        <h1>Home </h1>
      </Container>
    </>
  );
}
