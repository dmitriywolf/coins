import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import classes from './Layout.module.css';

export const Layout = ({ children }) => {
  return (
    <div className={classes.layout}>
      <div className={classes.content}>
        <Header />
        <main className={classes.main}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};
