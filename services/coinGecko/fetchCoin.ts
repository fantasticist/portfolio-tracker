import { ENDPOINT } from './common';

export type GetCoinParams = {
  id: string;
  localization?: boolean | string; // TODO
  tickers?: boolean;
  market_data?: boolean;
  community_data?: boolean;
  developer_data?: boolean;
  sparkline?: boolean;
};

export async function fetchCoin(params: GetCoinParams) {
  params = Object.assign(
    {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: true,
    },
    params,
  );

  // @ts-ignore
  const searchParams = new URLSearchParams(params);

  const result = await fetch(`${ENDPOINT}/coins/${params.id}?${searchParams}`, {
    next: { revalidate: 10 },
  });

  return result.json();
}
