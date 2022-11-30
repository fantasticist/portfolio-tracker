'use client';

import { useSize } from '@/hooks/useSize';
import { getCoin } from '@/services/coinGecko';
import { Suspense, use, useMemo, useRef } from 'react';
import { Curve } from './Curve';
import { Price } from './Price';

export type CoinCard = {
  coin: string;
};

export function CoinCard({ coin }: CoinCard) {
  return (
    <Suspense fallback={'Loading'}>
      <CoinCardInner coin={coin} />
    </Suspense>
  );
}

export function CoinCardInner({ coin }: CoinCard) {
  const ref = useRef(null);
  const size: any = useSize(ref);
  const data = use(getCoin({ id: coin }));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex font-semibold space-x-2 items-center">
          <span>ETH</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>

          <span>USD</span>
        </div>
        <div className="font-medium text-green-600">+10.01%</div>
      </div>
      <div className="">
        <Price coin={coin} data={data} />
      </div>
      <div ref={ref}>
        <Curve coin={coin} width={size?.width ?? 0} height={80} data={data} />
      </div>
    </div>
  );
}
