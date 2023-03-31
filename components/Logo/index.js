import Link from 'next/link';

import LogoImg from '@/public/images/Logo.svg';

import classes from './styles.module.scss';

export default function Logo({ sidebar }) {
  return (
    <Link href='/'>
      <div className={sidebar ? classes.sidebarLogo : classes.logo}>
        <LogoImg />
        <p className={classes.logoTitle}>
          <span className={classes.title}>CRYPTO</span>
          <span className={classes.subtitle}>COMPARE</span>
        </p>
      </div>
    </Link>
  );
}
