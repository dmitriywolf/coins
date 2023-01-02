import { dehydrate, QueryClient } from '@tanstack/react-query';
import { List, Select, Typography } from 'antd';
import { getCategories } from 'api';
import { CATEGORIES_SORT_OPTIONS } from 'common/constant';
import { Container, Loader, MotionCategoryItem, Navigation } from 'components';
import { useGetCategoriesQuery } from 'hooks';
import Head from 'next/head';
import { useState } from 'react';
import classes from 'styles/CategoriesPage.module.scss';

const { Title, Text } = Typography;

const variants = {
  visible: (i) => ({
    opacity: 1,
    transition: { delay: i * 0.2 },
    x: 0,
  }),
  hidden: {
    opacity: 0,
    x: -100,
  },
};

export default function CategoriesPage() {
  const [sort, setSort] = useState(CATEGORIES_SORT_OPTIONS[0].value);
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
              <Text type='secondary' strong>
                Sort by
              </Text>
              <Select
                defaultValue={CATEGORIES_SORT_OPTIONS[0]}
                options={CATEGORIES_SORT_OPTIONS}
                placeholder={<p>Select sort..</p>}
                onChange={sortHandler}
                style={{
                  width: 180,
                }}
              />
            </div>
          </div>
          <Loader active={isLoading} size='large'>
            <List
              dataSource={data}
              pagination={{
                pageSize: 5,
                position: 'top',
                showSizeChanger: false,
              }}
              renderItem={(
                {
                  id,
                  name,
                  content,
                  market_cap,
                  top_3_coins,
                  market_cap_change_24h,
                  volume_24h,
                },
                idx,
              ) => (
                <MotionCategoryItem
                  initial='hidden'
                  animate='visible'
                  variants={variants}
                  custom={idx}
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
