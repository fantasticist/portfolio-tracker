import { use } from 'react';
import clsx from 'clsx';

import { fetchCoin } from '@/services/coinGecko';

export function PriceChangePercentage({ coin }: { coin: string }) {
  const data = use(fetchCoin({ id: coin }));
  const percentage = data?.market_data.price_change_percentage_24h ?? 0;

  return (
    <div
      className={clsx('font-medium', {
        'text-red-600': percentage < 0,
        'text-green-600': percentage > 0,
      })}
    >
      {`${percentage}%`}
    </div>
  );
}
