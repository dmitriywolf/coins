import { dehydrate, QueryClient } from '@tanstack/react-query';
import { List, Select, Typography } from 'antd';
import Head from 'next/head';
import { useState } from 'react';

import { getCategories } from '../../api';
import { CategoryItem, Container, Loader, Navigation } from '../../components';
import { useGetCategoriesQuery } from '../../hooks';
import classes from '../../styles/CategoriesPage.module.css';

const { Title } = Typography;

const options = [
  {
    value: 'market_cap_desc',
    label: 'Market Cap ↓',
  },
  {
    value: 'market_cap_asc',
    label: 'Market Cap ↑',
  },
  {
    value: 'name_desc',
    label: 'Name ↓',
  },
  {
    value: 'name_asc',
    label: 'Name ↑',
  },
  {
    value: 'market_cap_change_24h_desc',
    label: 'Change in 24h ↓',
  },
  {
    value: 'market_cap_change_24h_asc',
    label: 'Change in 24h ↑',
  },
];

export default function CategoriesPage() {
  const [sort, setSort] = useState(options[0].value);
  const { data, isLoading } = useGetCategoriesQuery(sort);

  const sortHandler = (value) => {
    setSort(value);
  };

  const breadcrumbs = [{ title: 'Categories' }];

  return (
    <>
      <Head>
        <title>Categories</title>
        <meta
          name='description'
          content='List of all available crypto coin categories'
        />
      </Head>
      <div className={`${classes.categoriesPage} page`}>
        <Container>
          <Navigation crumbs={breadcrumbs} />
          <Title>Categories {data?.length ? `/ ${data?.length}` : ''}</Title>
          <div className={classes.sortWrap}>
            <div className={classes.sortInner}>
              <p className={classes.sortTitle}>Sort by</p>
              <Select
                defaultValue={options[0]}
                options={options}
                placeholder={<p>Select sort..</p>}
                className='customSelect'
                popupClassName='customDropDowmMenu'
                onChange={sortHandler}
                style={{
                  width: 180,
                }}
              />
            </div>
          </div>
          <Loader active={isLoading} size='large' bg='#F4F5F6'>
            <List
              dataSource={data}
              pagination={{
                pageSize: 5,
                position: 'top',
                showSizeChanger: false,
              }}
              renderItem={({
                id,
                name,
                content,
                market_cap,
                top_3_coins,
                market_cap_change_24h,
                volume_24h,
              }) => (
                <CategoryItem
                  id={id}
                  name={name}
                  content={content}
                  marketCap={market_cap}
                  topCoins={top_3_coins}
                  marketCapChange24h={market_cap_change_24h}
                  volume24h={volume_24h}
                />
              )}
            ></List>
          </Loader>
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['categories', 'market_cap_desc'], () =>
    getCategories('market_cap_desc'),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
