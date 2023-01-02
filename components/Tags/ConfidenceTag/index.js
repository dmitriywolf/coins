import { Tag } from 'antd';

export function ConfidenceTag({ score }) {
  if (!score) {
    return <div>-</div>;
  }

  let color = '#F43F3F';
  let text = 'Low';

  if (score === 'green') {
    color = '#18B04D';
    text = 'High';
  }

  if (score === 'yellow') {
    color = '#FEC27C';
    text = 'Moderate';
  }

  return <Tag color={color}>{text}</Tag>;
}
