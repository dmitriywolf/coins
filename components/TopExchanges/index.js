import { Col, Row, Typography } from 'antd';

import { MotionTopExchangeItem } from './TopExhangeItem';

const { Title } = Typography;

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

export function TopExchanges({ exchages }) {
  return (
    <>
      <Title level={3} align='center'>
        Top 10 Exchanges by Trust
      </Title>
      <Row gutter={[16, 16]}>
        {exchages?.map((item, idx) => (
          <Col span={24} key={item.id}>
            <MotionTopExchangeItem
              initial='hidden'
              animate='visible'
              variants={variants}
              custom={idx}
              {...item}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
