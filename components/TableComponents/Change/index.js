import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Statistic } from 'antd';

export function Change({ value, suffix = '%' }) {
  const displayValue = Math.abs(Math.round(value * 100) / 100);

  const isGrowth = value > 0;

  return (
    <Statistic
      value={displayValue}
      precision={2}
      valueStyle={{
        color: `${isGrowth ? '#3f8600' : '#cf1322'}`,
        fontSize: '14px',
        fontWeight: '500',
      }}
      prefix={isGrowth ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
      suffix={suffix ? suffix : '%'}
    />
  );
}
