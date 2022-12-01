import { use } from 'react';
import { fetchCoin } from '@/services/coinGecko';

export type CurrentPriceProps = {
  coin: string;
};

export function CurrentPrice({ coin }: CurrentPriceProps) {
  const data = use(fetchCoin({ id: coin }));
  return (
    <div className="text-4xl font-bold">
      <div>${data?.market_data.current_price.usd ?? 0}</div>
    </div>
  );
}
