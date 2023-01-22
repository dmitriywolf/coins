import { Typography } from 'antd';
import { Container, Navigation } from 'components';
import Head from 'next/head';

// import classes from '../../styles/ExchangesPage.module.scss';

const { Title } = Typography;

export default function NFTSPage() {
  const breadcrumbs = [{ title: 'NFTS' }];

  return (
    <>
      <Head>
        <title>NFTS</title>
        <meta
          name='description'
          content='List of all available crypto coin categories'
        />
      </Head>
      <div className='page'>
        <Container>
          <Navigation crumbs={breadcrumbs} />
          <Title>NFTS</Title>
          <div></div>
        </Container>
      </div>
    </>
  );
}
