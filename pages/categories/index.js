import { Col, Row, Select, Typography } from 'antd';
import Head from 'next/head';
import { useState } from 'react';

import { CategoryItem, Container, Navigation } from '../../components';
import { useGetCategoriesQuery } from '../../hooks';
import classes from '../../styles/CategoriesPage.module.css';

const { Title } = Typography;

export default function CategoriesPage() {
  const [order, setOrder] = useState('market_cap_desc');

  const { data: categories } = useGetCategoriesQuery({
    variables: {
      order,
    },
  });

  const breadcrumbs = [{ title: 'Categories' }];

  const options = [
    {
      value: 'market_cap_desc',
      label: 'Market Cap DESC',
    },
    {
      value: 'market_cap_asc',
      label: 'Market Cap ASC',
    },
    {
      value: 'name_desc',
      label: 'Name DESC',
    },
    {
      value: 'name_asc',
      label: 'Name ASC',
    },
    {
      value: 'market_cap_change_24h_desc',
      label: 'Change in 24h DESC',
    },
    {
      value: 'market_cap_change_24h_asc',
      label: 'Change in 24h ASC',
    },
  ];

  const sort = (value) => {
    setOrder(value);
  };

  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>
      <div className={`${classes.categoriesPage} page`}>
        <Container>
          <Navigation crumbs={breadcrumbs} />
          <Title>Categories / {categories?.length}</Title>
          <div className={classes.sortWrap}>
            <p className={classes.sortTitle}>Sort by</p>
            <Select
              defaultValue={options[0]}
              options={options}
              placeholder={<p>Select sort..</p>}
              className='customSelect'
              popupClassName='customDropDowmMenu'
              onChange={sort}
              style={{
                width: 260,
              }}
            />
          </div>
          <Row gutter={[16, 16]}>
            {categories?.map(
              ({
                id,
                name,
                content,
                market_cap,
                top_3_coins,
                market_cap_change_24h,
                volume_24h,
              }) => (
                <Col span={24} key={id}>
                  <CategoryItem
                    id={id}
                    name={name}
                    content={content}
                    marketCap={market_cap}
                    topCoins={top_3_coins}
                    marketCapChange24h={market_cap_change_24h}
                    volume24h={volume_24h}
                  />
                </Col>
              ),
            )}
          </Row>
        </Container>
      </div>
    </>
  );
}
