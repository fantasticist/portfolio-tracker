'use client';

import { getCoin } from '@/services/coinGecko';
import { Suspense, use } from 'react';

export type PriceProps = {
  coin: string;
  data?: any;
};

// export function Price({ coin }: PriceProps) {
//   return (
//     <Suspense fallback={<PriceLoading />}>
//       <PriceInner coin={coin} />
//     </Suspense>
//   );
// }

export function Price({ coin, data }: PriceProps) {
  // data = use(getCoin({ id: coin, market_data: true }));

  return (
    <div className="text-4xl font-bold">
      <div>${data?.market_data.current_price.usd ?? 0}</div>;
    </div>
  );
}

function PriceLoading() {
  return (
    <div className="relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent">
      <div className="h-10 rounded-lg bg-zinc-700" />
    </div>
  );
}
