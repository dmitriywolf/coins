import Head from 'next/head';

import { Container, Navigation } from '../../components/UI';

export default function Profile() {
  const breadcrumbs = [{ title: 'Profile' }];

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name='description' content='Profile' />
      </Head>

      <Container>
        <Navigation crumbs={breadcrumbs} />
        <p>Prodile </p>
      </Container>
    </>
  );
}
