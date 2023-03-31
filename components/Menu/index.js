import Link from 'next/link';
import { useRouter } from 'next/router';

import { PATHS } from '@/common/constant';

import classes from './styles.module.scss';

export default function Menu({ sidebar }) {
  const router = useRouter();

  return (
    <div className={sidebar ? classes.sidebarMenu : classes.headerMenu}>
      <nav className={classes.menu}>
        {PATHS.map(({ path, title, icon }) => (
          <Link
            key={title}
            href={path}
            className={`${classes.link} ${
              router.asPath === path ? 'active' : ''
            }`}
          >
            {icon}
            <span>{title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
