import { Image, Space, Typography } from 'antd';

const { Text } = Typography;

export function MarketName({ image, name }) {
  return (
    <Space>
      <Image src={image} alt={name} preview={false} width={32} height={32} />
      <Text strong>{name}</Text>
    </Space>
  );
}
