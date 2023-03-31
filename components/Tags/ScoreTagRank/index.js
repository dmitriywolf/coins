import { Tag } from 'antd';

export default function ScoreTagRank({ rank, text }) {
  let color;

  if (rank === 1) {
    color = '#18B04D';
  } else if (rank === 2) {
    color = '#3772FF';
  } else if (rank === 3) {
    color = '#FEC27C';
  } else {
    color = '#B1B5C4';
  }

  return (
    <Tag color={color}>
      {text}
      {rank}
    </Tag>
  );
}
