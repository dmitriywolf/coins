import { Tag } from 'antd';

import classes from './styles.module.css';

export function ConfidenceTag({ score }) {
  if (!score) {
    return <div className={classes.tagWrap}>-</div>;
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

  return (
    <div className={classes.tagWrap}>
      <Tag color={color}>{text}</Tag>
    </div>
  );
}
