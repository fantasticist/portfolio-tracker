import { useQuery } from '@tanstack/react-query';

const ENDPOINT = 'https://api.coingecko.com/api/v3';

export type QueryCoinParams = {
  id: string;
  localization?: boolean | string; // TODO
  tickers?: boolean;
  market_data?: boolean;
  community_data?: boolean;
  developer_data?: boolean;
  sparkline?: boolean;
};

export function useQueryCoin(params: QueryCoinParams) {
  params = Object.assign(
    {
      localization: false,
      tickers: false,
      market_data: false,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
    params,
  );
  // @ts-ignore
  const searchParams = new URLSearchParams(params);

  return useQuery({
    queryKey: ['coins', searchParams.toString()],
    queryFn: async () => {
      const result = await fetch(
        `${ENDPOINT}/coins${params.id}?${searchParams}`,
      );
      return result.json();
    },
  });
}
