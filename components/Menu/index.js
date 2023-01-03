import { PATHS } from 'common/constant';
import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './styles.module.scss';

export function Menu() {
  const router = useRouter();

  return (
    <div className={classes.headerMenu}>
      <nav className={classes.menu}>
        {PATHS.map(({ path, title, icon }) => (
          <div
            key={title}
            className={`${classes.link} ${
              router.asPath === path ? 'active' : ''
            }`}
          >
            {icon}
            <Link href={path}>{title}</Link>
          </div>
        ))}
      </nav>
    </div>
  );
}
