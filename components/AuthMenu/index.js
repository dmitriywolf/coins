import { Button } from 'antd';

import { wrap } from './styles.module.scss';

export function AuthMenu() {
  return (
    <div className={wrap}>
      <Button>Sign In</Button>
      <Button type='primary'>Sign Up</Button>
    </div>
  );
}
