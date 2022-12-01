'use client';

import { CoinCard } from '@/ui/CoinCard';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3">
      <CoinCard coin="bitcoin" />
    </div>
  );
}
