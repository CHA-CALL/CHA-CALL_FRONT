import { useQuery } from '@tanstack/react-query';

import { SET_REGIONS_KEYS } from '@shared/querykey/food-trucks/set-locations';
import { getRegionsData, searchRegionsData } from '@pages/set-location/api';
import { DEPTHS } from '@pages/set-location/constant/set-location';

export const useDepth1Query = () => {
  return useQuery({
    queryKey: SET_REGIONS_KEYS.DEPTH(DEPTHS.ONE),
    queryFn: () => getRegionsData({ depth: DEPTHS.ONE }),
  });
};

export const useDepth2Query = (selectedDepth1Code: number | undefined) => {
  return useQuery({
    queryKey: SET_REGIONS_KEYS.DEPTH_ID(DEPTHS.TWO, selectedDepth1Code),
    queryFn: () =>
      getRegionsData({ depth: DEPTHS.TWO, parentCode: selectedDepth1Code }),
    enabled: !!selectedDepth1Code,
  });
};

export const useDepth3Query = (selectedDepth2Code: number | undefined) => {
  return useQuery({
    queryKey: SET_REGIONS_KEYS.DEPTH_ID(DEPTHS.THREE, selectedDepth2Code),
    queryFn: () =>
      getRegionsData({ depth: DEPTHS.THREE, parentCode: selectedDepth2Code }),
    enabled: !!selectedDepth2Code,
  });
};

export const useSearchRegionQuery = (searchText: string) => {
  return useQuery({
    queryKey: SET_REGIONS_KEYS.SEARCH(searchText),
    queryFn: () => searchRegionsData({ keyword: searchText }),
    enabled: !!searchText,
  });
};
