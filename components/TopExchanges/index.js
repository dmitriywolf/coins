import { Col, Row, Typography } from 'antd';

import { TopExchangeItem } from './TopExhangeItem';

const { Title } = Typography;

export function TopExchanges({ exchages }) {
  return (
    <>
      <Title level={3} align='center'>
        Top 10 Exchanges by Trust
      </Title>
      <Row gutter={[16, 16]}>
        {exchages?.map((item) => (
          <Col span={24} key={item.id}>
            <TopExchangeItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
