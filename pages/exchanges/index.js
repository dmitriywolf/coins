import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Typography } from 'antd';
import { getExchanges } from 'api';
import { Container, Navigation, TopExchanges } from 'components';
import { useGetExchangesQuery } from 'hooks';
import Head from 'next/head';

// import classes from '../../styles/ExchangesPage.module.scss';

const { Title } = Typography;

export default function ExchangesPage() {
  const { data: exchages } = useGetExchangesQuery({
    variables: { page: 0, per_page: 10 },
  });

  const breadcrumbs = [{ title: 'Exchanges' }];

  return (
    <>
      <Head>
        <title>Exchanges</title>
        <meta
          name='description'
          content='List of all available crypto coin categories'
        />
      </Head>
      <div className='page'>
        <Container>
          <Navigation crumbs={breadcrumbs} />
          <Title>Exchanges</Title>
          <div>
            <TopExchanges exchages={exchages} />
          </div>
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['exchanges', 0, 10], () =>
    getExchanges({ page: 0, per_page: 10 }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
