import classes from './styles.module.css';

export function Pair({ base, target }) {
  return (
    <div className={classes.linkWrap}>
      <span>{`${base}/${target}`}</span>
    </div>
  );
}
