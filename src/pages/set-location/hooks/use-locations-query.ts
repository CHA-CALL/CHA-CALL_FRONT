import { useQuery } from '@tanstack/react-query';

import { SET_LOCATIONS_KEYS } from '@shared/querykey/food-trucks/set-locations';
import { getRegionsData, searchRegionsData } from '@pages/set-location/api';

export const useGetSiDoQuery = () => {
  return useQuery({
    queryKey: SET_LOCATIONS_KEYS.DEPTH(1),
    queryFn: () => getRegionsData({ depth: 1 }),
  });
};

export const useGetSiGunGuQuery = (selectedSiDoId: number | undefined) => {
  return useQuery({
    queryKey: SET_LOCATIONS_KEYS.DEPTH_ID(2, selectedSiDoId),
    queryFn: () => getRegionsData({ depth: 2, parentCode: selectedSiDoId }),
    enabled: !!selectedSiDoId,
  });
};

export const useGetLocationQuery = (selectedSiGunGuId: number | undefined) => {
  return useQuery({
    queryKey: SET_LOCATIONS_KEYS.DEPTH_ID(3, selectedSiGunGuId),
    queryFn: () => getRegionsData({ depth: 3, parentCode: selectedSiGunGuId }),
    enabled: !!selectedSiGunGuId,
  });
};

export const useSearchLocationQuery = (searchText: string) => {
  return useQuery({
    queryKey: SET_LOCATIONS_KEYS.SEARCH(searchText),
    queryFn: () => searchRegionsData({ keyword: searchText }),
    enabled: !!searchText,
  });
};
