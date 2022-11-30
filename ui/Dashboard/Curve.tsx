'use client';

import { curveNatural } from '@visx/curve';
import { LinePath } from '@visx/shape';
import { extent } from 'd3-array';
import type { DateValue } from '@visx/mock-data/lib/generators/genDateValue';
import { scaleTime } from '@visx/scale';
import { Group } from '@visx/group';
import { Suspense, use, useMemo } from 'react';
import { getCoin } from '@/services/coinGecko';

export type CurveProps = {
  coin: string;
  width: number;
  height: number;
  data?: any;
};

// export function Curve(props: CurveProps) {
//   return (
//     <Suspense fallback={'Loading'}>
//       <CurveInner {...props} />
//     </Suspense>
//   );
// }

export function Curve({ coin, width, height, data }: CurveProps) {
  // const data = use(getCoin({ id: coin }));

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

  const getX = (d: DateValue) => d.date;
  const getY = (d: DateValue) => d.value;

  console.log(allData);

  const xScale = scaleTime<number>({
    domain: extent(allData, getX) as [Date, Date],
  });
  const yScale = scaleTime<number>({
    domain: extent(allData, getY) as [number, number],
  });

  xScale.range([0, width]);
  yScale.range([height - 8, 0]);

  return (
    <svg width={width} height={height}>
      {width > 8 && (
        <Group top={4} left={0}>
          <LinePath<DateValue>
            curve={curveNatural}
            data={allData}
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
  );
}
