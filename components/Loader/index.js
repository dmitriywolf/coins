import { Spin } from 'antd';

import classes from './styles.module.scss';

export default function Loader({
  children,
  active,
  size = 'default',
  text = 'Loading...',
  bg = 'transparent',
}) {
  return (
    <div className={classes.wrap}>
      {active ? (
        <>
          <div className={classes.loader}>
            <Spin size={size} tip={text} />
          </div>
          <div className={classes.overlay} style={{ background: bg }}></div>
        </>
      ) : null}
      <>{children}</>
    </div>
  );
}
