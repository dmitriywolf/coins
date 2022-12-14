import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart';

import { useCurrencyContext } from '../../../context';
import { formatNumber } from '../../../utils';
import classes from './styles.module.scss';

export default function Chart({ data, title, type }) {
  const { currency } = useCurrencyContext();
  const accessors = {
    xAccessor: (d) => {
      const date = new Date(d.x);
      return date;
    },
    yAccessor: (d) => d.y,
  };

  const getFullDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
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
      {data?.length > 0 ? (
        <XYChart
          height={360}
          xScale={{ type: 'band' }}
          yScale={{ type: 'linear' }}
        >
          <AnimatedAxis
            orientation='bottom'
            label='Date'
            strokeWidth='1'
            labelClassName={classes.axisLabel}
            numTicks={6}
          />
          <AnimatedAxis
            orientation='left'
            tickFormat={!isPriceGraph ? formatBigSum : undefined}
            hideZero={true}
          />
          <AnimatedGrid columns={false} numTicks={10} />
          <AnimatedLineSeries
            dataKey={title}
            data={data}
            {...accessors}
            colorAccessor={() => getColorLine(type)}
          />
          <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showVerticalCrosshair
            showSeriesGlyphs
            renderTooltip={({ tooltipData }) => (
              <div className={classes.tooltip}>
                <p className={classes.tooltipDate}>
                  {getFullDate(
                    accessors.xAccessor(tooltipData.nearestDatum.datum),
                  )}
                </p>
                <p className={classes.tooltipData}>
                  {isPriceGraph ? (
                    <>
                      {formatNumber(
                        accessors.yAccessor(tooltipData.nearestDatum.datum),
                      )}
                    </>
                  ) : (
                    <>
                      {formatNumber(
                        Math.round(
                          accessors.yAccessor(tooltipData.nearestDatum.datum),
                        ),
                      )}
                    </>
                  )}
                  {` ${currency.symbol}`}
                </p>
              </div>
            )}
          />
        </XYChart>
      ) : null}
    </div>
  );
}
