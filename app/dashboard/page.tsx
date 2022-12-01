'use client';

import { CoinCard } from '@/ui/CoinCard';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 space-x-6">
      <CoinCard coin="bitcoin" symbol="BTC" />
      <CoinCard coin="ethereum" symbol="ETH" />
      <CoinCard coin="solana" symbol="SOL" />
    </div>
  );
}
