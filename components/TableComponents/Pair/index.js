import classes from './styles.module.scss';

export function Pair({ base, target }) {
  return (
    <div className={classes.linkWrap}>
      <span>{`${base}/${target}`}</span>
    </div>
  );
}
