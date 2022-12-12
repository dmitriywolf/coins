import { Card, Image, Space, Tag, Typography } from 'antd';

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

export function TopExchangeItem({
  country,
  description,
  image,
  name,
  trade_volume_24h_btc_normalized,
  trust_score,
  trust_score_rank,
  url,
  year_established,
}) {
  function navToExchange() {
    window.open(url, '_blank');
  }

  return (
    <Card className={classes.card} onClick={navToExchange}>
      <Space align='start'>
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
            <Space>
              {country && (
                <>
                  <Text strong>Country: </Text>
                  <Text type='secondary' strong>
                    {country}
                  </Text>
                </>
              )}
              {year_established && (
                <>
                  <Text strong>Established: </Text>
                  <Text type='secondary' strong>
                    {year_established}
                  </Text>
                </>
              )}
            </Space>
          ) : null}

          <Space>
            <Text strong>Trade volume in 24h:</Text>
            <Text type='secondary' strong>
              {formatNumber(trade_volume_24h_btc_normalized)} BTC
            </Text>
          </Space>
          {description && <p className={classes.description}>{description}</p>}
        </Space>
      </Space>
    </Card>
  );
}
