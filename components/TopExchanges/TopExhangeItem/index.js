import { Card, Image, Space, Tag, Typography } from 'antd';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

import { formatNumber } from '../../../utils';
import classes from './styles.module.css';

const { Text } = Typography;

const ScoreTagRank = ({ rank, text }) => {
  let color;

  if (rank === 1) {
    color = '#18B04D';
  } else if (rank === 2) {
    color = '#3772FF';
  } else if (rank === 3) {
    color = '#FEC27C';
  } else {
    color = '#B1B5C4';
  }

  return (
    <Tag color={color}>
      {text}
      {rank}
    </Tag>
  );
};

const TrustTag = ({ score }) => {
  if (score >= 9) {
    return <Tag color='#87d068'>High</Tag>;
  }

  if (score >= 6 && score < 9) {
    return <Tag color='#ffa500'>Middle</Tag>;
  }

  if (score < 6) {
    return <Tag color='#f50'>Low</Tag>;
  }
  return <div>-</div>;
};

const TopExchangeItem = forwardRef(
  (
    {
      country,
      description,
      image,
      name,
      trade_volume_24h_btc_normalized,
      trust_score,
      trust_score_rank,
      url,
      year_established,
    },
    ref,
  ) => {
    function navToExchange() {
      window.open(url, '_blank');
    }

    return (
      <div ref={ref}>
        <Card className={classes.card} onClick={navToExchange}>
          <div className={classes.cardInner} ref={ref}>
            <div className={classes.logoWrap}>
              <Image src={image} alt={name} preview={false} />
            </div>
            <Space direction='vertical'>
              <div className={classes.titleWrap}>
                <ScoreTagRank text='#' rank={trust_score_rank} />
                <TrustTag score={trust_score} />
                <h3 className={classes.title}>{name}</h3>
              </div>
              {country || year_established ? (
                <Space direction='vertical'>
                  {country && (
                    <Space>
                      <Text strong>Country: </Text>
                      <Text type='secondary' strong>
                        {country}
                      </Text>
                    </Space>
                  )}
                  {year_established && (
                    <Space>
                      <Text strong>Established: </Text>
                      <Text type='secondary' strong>
                        {year_established}
                      </Text>
                    </Space>
                  )}
                </Space>
              ) : null}
              <Space>
                <Text strong>Trade volume in 24h:</Text>
                <Text type='secondary' strong>
                  {formatNumber(trade_volume_24h_btc_normalized)} BTC
                </Text>
              </Space>
              {description && (
                <p className={classes.description}>{description}</p>
              )}
            </Space>
          </div>
        </Card>
      </div>
    );
  },
);

TopExchangeItem.displayName = 'TopExchangeItem';

export const MotionTopExchangeItem = motion(TopExchangeItem);
