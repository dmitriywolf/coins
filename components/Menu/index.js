import Link from 'next/link';
import { useRouter } from 'next/router';

import { PATHS } from '../../common/constant';
import classes from './styles.module.css';

export function Menu() {
  const router = useRouter();

  return (
    <nav className={classes.menu}>
      {PATHS.map(({ path, title, icon }) => (
        <div
          key={title}
          className={router.asPath === path ? classes.linkActive : classes.link}
        >
          {icon}
          <Link href={path}>{title}</Link>
        </div>
      ))}
    </nav>
  );
}
