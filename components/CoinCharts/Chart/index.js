import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import { Space, Typography } from 'antd';
import { timeFormat } from 'd3-time-format';

import { useCurrencyContext } from '../../../context';
import { formatNumber } from '../../../utils';
import classes from './styles.module.css';

const { Text } = Typography;

export function Chart({ data, title }) {
  const { currency } = useCurrencyContext();
  const accessors = {
    xAccessor: (d) => {
      const date = new Date(d.x);
      return date;
    },
    yAccessor: (d) => d.y,
  };

  const format = timeFormat('%Y %b %d');
  const formatDate = (date) => format(date);

  const getFullDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <>
      {data?.length > 0 ? (
        <XYChart
          height={600}
          xScale={{ type: 'band' }}
          yScale={{ type: 'linear' }}
        >
          <AnimatedAxis
            orientation='bottom'
            label='Date'
            stroke='#777E91'
            tickFormat={formatDate}
            labelClassName={classes.axisLabel}
          />
          <AnimatedAxis
            orientation='left'
            label={`${title}, ${currency.value.toUpperCase()}`}
            stroke='#777E91'
            labelClassName={classes.axisLabel}
          />
          <AnimatedGrid columns={false} numTicks={6} />
          <AnimatedLineSeries dataKey={title} data={data} {...accessors} />
          <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showVerticalCrosshair
            showSeriesGlyphs
            renderTooltip={({ tooltipData }) => (
              <div className={classes.tooltip}>
                <Space direction='vertical'>
                  <Space>
                    <Text>Time:</Text>
                    <Text type='secondary'>
                      {getFullDate(
                        accessors.xAccessor(tooltipData.nearestDatum.datum),
                      )}
                    </Text>
                  </Space>
                  <Space>
                    <Text>{title}:</Text>
                    <Text type='secondary'>
                      {`${formatNumber(
                        accessors.yAccessor(tooltipData.nearestDatum.datum),
                      )} ${currency.value.toUpperCase()}`}
                    </Text>
                  </Space>
                </Space>
              </div>
            )}
          />
        </XYChart>
      ) : null}
    </>
  );
}
