import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Statistic, theme } from 'antd';

export default function Change({ value, suffix = '%' }) {
  const { useToken } = theme;
  const displayValue = Math.abs(Math.round(value * 100) / 100);

  const isGrowth = value > 0;

  const {
    token: { colorSuccessActive, colorErrorText },
  } = useToken();

  return (
    <Statistic
      value={displayValue}
      precision={2}
      valueStyle={{
        color: `${isGrowth ? colorSuccessActive : colorErrorText}`,
        fontSize: '14px',
        fontWeight: '500',
      }}
      prefix={isGrowth ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
      suffix={suffix ? suffix : '%'}
    />
  );
}
