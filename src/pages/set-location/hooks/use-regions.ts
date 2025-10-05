import { useQuery } from '@tanstack/react-query';
import { getRegions } from '@pages/set-location/api';
import { type GetRegionsData } from '@../../apis/data-contracts';
import { REGION_QUERY_KEY } from '@/shared/querykey/regions';

export const useDepth1Regions = () => {
  return useQuery<GetRegionsData>({
    queryKey: REGION_QUERY_KEY.DEPTH1(),
    queryFn: () => getRegions(1, null),
  });
};

export const useDepth2Regions = (
  depth1Code: number,
  enabled: boolean = true
) => {
  return useQuery<GetRegionsData>({
    queryKey: REGION_QUERY_KEY.DEPTH2(depth1Code),
    queryFn: () => getRegions(2, depth1Code),
    enabled,
  });
};

export const useDepth3Regions = (
  depth1Code: number,
  depth2Code: number,
  enabled: boolean = true
) => {
  return useQuery<GetRegionsData>({
    queryKey: REGION_QUERY_KEY.DEPTH3(depth1Code, depth2Code),
    queryFn: () => getRegions(3, depth2Code),
    enabled,
  });
};
