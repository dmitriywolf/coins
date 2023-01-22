import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Typography } from 'antd';
import { getTopExchanges } from 'api';
import { Container, Navigation, TopExchanges } from 'components';
import { useGetTopExchangesQuery } from 'hooks';
import Head from 'next/head';

// import classes from '../../styles/ExchangesPage.module.scss';

const { Title } = Typography;

export default function ExchangesPage() {
  const { data: exchages } = useGetTopExchangesQuery();

  const breadcrumbs = [{ title: 'Exchanges' }];

  return (
    <>
      <Head>
        <title>Categories</title>
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

  await queryClient.prefetchQuery(['topExchanges'], () => getTopExchanges());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
