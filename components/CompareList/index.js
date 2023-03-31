import { Col, Row, theme } from 'antd';
import { useCompareContext } from 'context';

import CompareItem from '@/components/CompareItem';

import classes from './styles.module.scss';

const { useToken } = theme;

export default function CompareList() {
  const { coins } = useCompareContext();
  const {
    token: { colorBgLayout },
  } = useToken();

  return (
    <div className={classes.row} style={{ backgroundColor: colorBgLayout }}>
      <Row align='stretch' gutter={[10, 10]}>
        {coins.map(({ fullName, image, internal }) => (
          <Col
            xs={{ span: 12 }}
            sm={{ span: 8 }}
            lg={{ span: 6 }}
            xl={{ span: 4 }}
            key={internal}
          >
            <CompareItem name={fullName} image={image} internal={internal} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
