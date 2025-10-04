import { useQuery } from '@tanstack/react-query';
import { getRegions } from '@pages/set-location/api';
import { type GetRegionsData } from '@../../apis/data-contracts';
import { REGION_QUERY_KEY } from '@/shared/querykey/regions';

const getQueryKey = (
  depth: number,
  options?: { depth1Code?: number; depth2Code?: number }
) => {
  switch (depth) {
    case 1:
      return REGION_QUERY_KEY.DEPTH1();
    case 2:
      return REGION_QUERY_KEY.DEPTH2(options?.depth1Code ?? 0);
    case 3:
      return REGION_QUERY_KEY.DEPTH3(
        options?.depth1Code ?? 0,
        options?.depth2Code ?? 0
      );
    default:
      return REGION_QUERY_KEY.DEPTH1();
  }
};

export const useRegions = (
  depth: number,
  options?: { enabled?: boolean; depth1Code?: number; depth2Code?: number }
) => {
  return useQuery<GetRegionsData>({
    queryKey: getQueryKey(depth, options),
    queryFn: () => {
      return getRegions(depth, depth === 1 ? null : options?.depth2Code);
    },
    enabled: options?.enabled ?? true,
  });
};
