import { LineChartOutlined, SlidersOutlined } from '@ant-design/icons';
import { Badge, theme } from 'antd';
import { useCompareContext } from 'context';
import Link from 'next/link';

import { button, iconWrap } from './styles.module.scss';

const { useToken } = theme;

export function CompareIcon({ isGraph }) {
  const { count, countGraph } = useCompareContext();

  const {
    token: { colorInfo },
  } = useToken();

  return (
    <div className={button}>
      <Badge
        count={isGraph ? countGraph : count}
        offset={[2, 4]}
        color={colorInfo}
      >
        <Link href={isGraph ? '/compare-graphs' : '/compare'}>
          <div className={iconWrap}>
            {isGraph ? <LineChartOutlined /> : <SlidersOutlined />}
          </div>
        </Link>
      </Badge>
    </div>
  );
}
