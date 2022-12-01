import { use, useMemo, useRef } from 'react';
import { LinePath } from '@visx/shape';
import { scaleTime } from '@visx/scale';
import { extent } from 'd3-array';
import { curveNatural } from '@visx/curve';
import { Group } from '@visx/group';

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
      .slice(0, 24)
      .reverse()
      .map((value: number, i: number) => {
        const date = new Date(now - ((1000 * 60 * 60 * 24 * 7) / count) * i);
        return { date, value };
      }) ?? [];

  return <Curve data={allData} />;
}

function Curve({ data, height = 80 }: { data: any[]; height?: number }) {
  const ref = useRef(null);
  const size: any = useSize(ref);
  const width = size?.width ?? 0;

  const getX = (d: DateValue) => d.date;
  const getY = (d: DateValue) => d.value;

  const xScale = scaleTime<number>({
    domain: extent(data, getX) as [Date, Date],
  });
  const yScale = scaleTime<number>({
    domain: extent(data, getY) as [number, number],
  });

  xScale.range([0, width]);
  yScale.range([height - 8, 0]);

  return (
    <div ref={ref}>
      <svg width={width} height={height}>
        {width > 8 && (
          <Group top={4} left={0}>
            <LinePath<DateValue>
              curve={curveNatural}
              data={data}
              x={(d) => xScale(getX(d)) ?? 0}
              y={(d) => yScale(getY(d)) ?? 0}
              stroke="#0284c7"
              strokeWidth={1}
              strokeOpacity={1}
              shapeRendering="geometricPrecision"
            />
          </Group>
        )}
      </svg>
    </div>
  );
}
