import { Col, Row } from 'antd';

import CompareItem from '@/components/CompareItem';
import { useCompareContext } from '@/context';

export default function CompareGraphList() {
  const { coinsGraph } = useCompareContext();

  return (
    <Row align='stretch' gutter={[10, 10]}>
      {coinsGraph.map(({ id, name, image }) => (
        <Col
          xs={{ span: 12 }}
          sm={{ span: 8 }}
          lg={{ span: 6 }}
          xl={{ span: 4 }}
          key={id}
        >
          <CompareItem id={id} name={name} image={image} isGraph={true} />
        </Col>
      ))}
    </Row>
  );
}
