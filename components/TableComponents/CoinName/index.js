import { Image, Tag, theme, Typography } from 'antd';

import classes from './styles.module.scss';

const { Text } = Typography;
const { useToken } = theme;

export function CoinName({ rank, image, name, symbol }) {
  const {
    token: { colorPrimary },
  } = useToken();

  return (
    <div className={classes.wrap}>
      <Image src={image} alt={name} preview={false} width={32} height={32} />
      <div className={classes.content}>
        {rank ? (
          <Tag
            color={colorPrimary}
            style={{ lineHeight: '16px', padding: '0 3px' }}
          >
            #{rank}
          </Tag>
        ) : null}
        <Text strong>
          {name}
          <Text type='secondary'>/{symbol.toUpperCase()}</Text>
        </Text>
      </div>
    </div>
  );
}
