import { use } from 'react';
import clsx from 'clsx';
import numeral from 'numeral';

import { fetchCoin } from '@/services/coinGecko';

export function PriceChangePercentage({ coin }: { coin: string }) {
  const data = use(fetchCoin({ id: coin }));
  const percentage = numeral(
    data?.market_data.price_change_percentage_24h ?? 0,
  );

  return (
    <div
      className={clsx('font-medium', {
        'text-red-600': percentage.value() ?? 0 < 0,
        'text-green-600': percentage.value() ?? 0 > 0,
      })}
    >
      {`${percentage.format('+0.00')}%`}
    </div>
  );
}
