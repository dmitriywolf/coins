import { Tag } from 'antd';

export const TrustTag = ({ score }) => {
  if (score >= 9) {
    return <Tag color='#87d068'>High</Tag>;
  }

  if (score >= 6 && score < 9) {
    return <Tag color='#ffa500'>Middle</Tag>;
  }

  if (score < 6) {
    return <Tag color='#f50'>Low</Tag>;
  }
  return <div>-</div>;
};
