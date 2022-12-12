import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import { timeFormat } from 'd3-time-format';
import React from 'react';

import { useCurrencyContext } from '../../context';
import { formatNumber } from '../../utils';
import classes from './styles.module.css';

export function MultiGraph({ charts, title, type }) {
  const { currency } = useCurrencyContext();

  const accessors = {
    xAccessor: (d) => d.x,
    yAccessor: (d) => d.y,
  };

  const format = timeFormat('%b %d');
  const formatDate = (date) => format(date);

  const getFullDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  const formatBigSum = (data) => data / 1000000;

  const isPriceGraph = type === 'price';
  return (
    <div className={classes.chart}>
      {charts?.length > 0 ? (
        <XYChart
          height={600}
          xScale={{ type: 'band' }}
          yScale={{ type: 'linear' }}
        >
          <AnimatedAxis
            orientation='bottom'
            label='Date'
            strokeWidth='1'
            tickFormat={formatDate}
            labelClassName={classes.axisLabel}
          />
          <AnimatedAxis
            orientation='left'
            label={`${title}, ${
              isPriceGraph ? '' : 'M'
            } ${currency.value.toUpperCase()}`}
            labelClassName={classes.axisLabel}
            labelOffset={20}
            tickFormat={!isPriceGraph ? formatBigSum : undefined}
            hideZero={true}
          />
          <AnimatedGrid columns={false} numTicks={10} />
          {charts?.map(({ coin, data }) => (
            <AnimatedLineSeries
              key={coin.name}
              dataKey={coin.name}
              data={data}
              {...accessors}
            />
          ))}

          <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showVerticalCrosshair
            showSeriesGlyphs
            renderTooltip={({ tooltipData, colorScale }) => (
              <div className={classes.tooltip}>
                <p className={classes.tooltipDate}>
                  {getFullDate(
                    accessors.xAccessor(tooltipData.nearestDatum.datum),
                  )}
                </p>
                <p>
                  <span
                    style={{ color: colorScale(tooltipData.nearestDatum.key) }}
                  >{`${tooltipData.nearestDatum.key}: `}</span>

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
