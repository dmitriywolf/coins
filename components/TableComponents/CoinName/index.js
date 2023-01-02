import { Image, Space, Typography } from 'antd';

import classes from './styles.module.scss';

const { Text } = Typography;

export function CoinName({ image, name, symbol }) {
  return (
    <div className={classes.wrap}>
      <Space>
        <Image src={image} alt={name} preview={false} width={32} height={32} />
        <Text strong>
          {name}
          <Text type='secondary'>/{symbol.toUpperCase()}</Text>
        </Text>
      </Space>
    </div>
  );
}
