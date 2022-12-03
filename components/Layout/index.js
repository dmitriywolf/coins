import { Footer } from './Footer';
import { Header } from './Header';
import classes from './styles.module.css';

export function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </>
  );
}
