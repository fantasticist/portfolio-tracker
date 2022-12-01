import { use, useMemo, useRef } from 'react';
import { AreaClosed, LinePath } from '@visx/shape';
import { scaleTime } from '@visx/scale';
import { extent } from 'd3-array';
import { curveMonotoneX, curveNatural } from '@visx/curve';
import { Group } from '@visx/group';
import { LinearGradient } from '@visx/gradient';
import clsx from 'clsx';

import { fetchCoin } from '@/services/coinGecko';
import { useSize } from '@/hooks/useSize';

export type PriceChangeCurveProps = {
  coin: string;
};

export type DateValue = { date: Date; value: number };

export function PriceChangeCurve({ coin }: PriceChangeCurveProps) {
  const data = use(fetchCoin({ id: coin }));

  const count = data.market_data.sparkline_7d.price.length;

  const now = useMemo(() => Date.now(), []);

  const allData =
    data?.market_data.sparkline_7d.price
      .slice(-24)
      .map((value: number, i: number) => {
        const start = now - 1000 * 60 * 60 * 24 * 7;
        const date = new Date(start + ((1000 * 60 * 60 * 24 * 7) / count) * i);
        return { date, value };
      }) ?? [];

  return <Curve data={allData} />;
}

type CurveProps = {
  data: any[]; // TODO
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

function Curve({
  data,
  height = 80,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
}: CurveProps) {
  const ref = useRef(null);
  const size: any = useSize(ref);
  const width = size?.width ?? 0;

  // bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const getX = (d: DateValue) => d.date;
  const getY = (d: DateValue) => d.value;

  // scales
  const xScale = useMemo(
    () =>
      scaleTime<number>({
        range: [margin.left, innerWidth + margin.left],
        domain: extent(data, getX) as [Date, Date],
      }),
    [],
  );
  const yScale = useMemo(
    () =>
      scaleTime<number>({
        range: [innerHeight + margin.top, margin.top],
        domain: extent(data, getY) as [number, number],
        nice: true,
      }),
    [],
  );

  xScale.range([0, width]);
  yScale.range([height - 8, 0]);

  const isRise = useMemo(
    () => data[data.length - 1].value - data[0].value > 0,
    [data],
  );

  return (
    <div ref={ref}>
      <svg width={width} height={height}>
        {width > 8 && (
          <Group top={4} left={0}>
            <LinePath<DateValue>
              className={clsx({
                'stroke-sky-600': isRise,
                'stroke-rose-600': !isRise,
              })}
              curve={curveNatural}
              data={data}
              x={(d) => xScale(getX(d)) ?? 0}
              y={(d) => yScale(getY(d)) ?? 0}
              strokeWidth={4}
              strokeOpacity={1}
              shapeRendering="geometricPrecision"
            />
            <LinearGradient
              id="area-gradient"
              from={isRise ? '#075985' : '#9f1239'} // TODO
              to={isRise ? '#0c4a6e' : '#881337'} // TODO
              toOpacity={0.1}
            />
            <AreaClosed<any>
              data={data}
              x={(d) => xScale(getX(d)) ?? 0}
              y={(d) => yScale(getY(d)) ?? 0}
              strokeWidth={1}
              stroke="url(#area-gradient)"
              fill="url(#area-gradient)"
              curve={curveMonotoneX}
              yScale={yScale}
            />
          </Group>
        )}
      </svg>
    </div>
  );
}
