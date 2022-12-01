import { use } from 'react';
import { fetchCoin } from '@/services/coinGecko';
import numeral from 'numeral';

export type CurrentPriceProps = {
  coin: string;
};

export function CurrentPrice({ coin }: CurrentPriceProps) {
  const data = use(fetchCoin({ id: coin }));
  const price = numeral(data?.market_data.current_price.usd ?? 0);

  return (
    <div className="text-3xl font-bold">
      <div>${price.format('0,0.00')}</div>
    </div>
  );
}
