import { Card, Image, Space, Typography } from 'antd';
import { ScoreTagRank, TrustTag } from 'components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { forwardRef } from 'react';
import { formatNumber } from 'utils';

import { card, content, inner, logo, title } from './styles.module.scss';

const { Text } = Typography;

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
        <Card onClick={navToExchange} className={card}>
          <div className={inner} ref={ref}>
            <div className={logo}>
              <Image src={image} alt={name} preview={false} />
            </div>
            <Space direction='vertical'>
              <div className={title}>
                <ScoreTagRank text='#' rank={trust_score_rank} />
                <TrustTag score={trust_score} />
                <h3>
                  <Link href='#'>{name}</Link>
                </h3>
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
              {description && <p className={content}>{description}</p>}
            </Space>
          </div>
        </Card>
      </div>
    );
  },
);

TopExchangeItem.displayName = 'TopExchangeItem';

export const MotionTopExchangeItem = motion(TopExchangeItem);
