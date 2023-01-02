import {
  FacebookOutlined,
  RedditOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { Card, Image, Space, Tag, Typography } from 'antd';
import { formatNumber } from 'utils';

import classes from './styles.module.scss';

const { Title, Text } = Typography;

export function CoinIntro({ intro }) {
  const {
    name,
    categories,
    algorith,
    genesis,
    image,
    rank,
    symbol,
    community: { facebook, reddit_posts, twitter },
  } = intro;

  return (
    <Card>
      <Space direction='vertical'>
        <Space align='end'>
          <Image src={image} alt={name} preview={false} />
          <div className={classes.title}>
            <Title level={1}>{name}</Title>
            <Title level={3} type='secondary'>
              {symbol ? `/ ${symbol.toUpperCase()}` : ''}
            </Title>
          </div>
        </Space>
        <div>
          <Tag color='#f50'>Rank #{rank}</Tag>
          {genesis ? <Tag color='#87d068'>{genesis}</Tag> : ''}
          {algorith ? <Tag color='#108ee9'>{algorith}</Tag> : ''}
        </div>
        {facebook || reddit_posts || twitter ? (
          <Space>
            <Text type='secondary'>Social:</Text>
            <div className={classes.tags}>
              {facebook ? (
                <Tag icon={<FacebookOutlined />} color='#3b5999'>
                  Likes {facebook}
                </Tag>
              ) : null}
              {reddit_posts ? (
                <Tag icon={<RedditOutlined />} color='#cd201f'>
                  {reddit_posts}
                </Tag>
              ) : null}
              {twitter ? (
                <Tag icon={<TwitterOutlined />} color='#55acee'>
                  {formatNumber(twitter)}
                </Tag>
              ) : null}
            </div>
          </Space>
        ) : null}
        {categories?.length > 0 ? (
          <>
            <Text type='secondary'>Categories:</Text>
            <Space align='start'>
              <div className={classes.tags}>
                {categories.map((item) => (
                  <Tag key={item} color='#23262f'>
                    {item}
                  </Tag>
                ))}
              </div>
            </Space>
          </>
        ) : null}
      </Space>
    </Card>
  );
}
