import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
} from '@visx/xychart';
import ResizeObserver from 'resize-observer-polyfill';

import { useCurrencyContext } from '@/context';

import classes from './styles.module.scss';

export default function Chart({ data, title, type }) {
  const { currency } = useCurrencyContext();

  const dataOptions = {
    month: 'numeric',
    day: 'numeric',
  };

  const accessors = {
    xAccessor: (d) => {
      const date = new Date(d.x);
      return date.toLocaleDateString('en-GB', dataOptions);
    },
    yAccessor: (d) => d.y,
  };

  function getColorLine(type) {
    switch (type) {
      case 'price':
        return '#F43F3F';
      case 'marketCap':
        return '#18B04D';
      case 'volume':
        return '#3772FF';
      default:
        return '#777E91';
    }
  }

  const formatBigSum = (data) => data / 1000000;

  const isPriceGraph = type === 'price';

  return (
    <div className={classes.chart}>
      <p className={classes.title}>{`${title} ${currency.symbol}`}</p>
      <XYChart
        height={350}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}
        resizeObserverPolyfill={ResizeObserver}
      >
        <AnimatedAxis
          orientation='bottom'
          strokeWidth='1'
          labelClassName={classes.axisLabel}
          numTicks={7}
        />
        <AnimatedAxis
          orientation='left'
          tickFormat={!isPriceGraph ? formatBigSum : undefined}
          hideZero={true}
        />
        <AnimatedGrid columns={false} numTicks={7} />
        <AnimatedLineSeries
          dataKey={title}
          data={data}
          {...accessors}
          colorAccessor={() => getColorLine(type)}
        />
      </XYChart>
    </div>
  );
}
