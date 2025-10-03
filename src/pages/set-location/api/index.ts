import type {
  GetRegionsData,
  SearchRegionsData,
} from '@/../apis/data-contracts';

import { apiRequest } from '@api/apiRequest';

export type RegionDepth = 1 | 2 | 3;

export const getRegionsData = async (params: {
  depth: RegionDepth;
  parentCode?: number;
}) => {
  const response = await apiRequest<GetRegionsData>({
    endPoint: `/regions`,
    method: 'GET',
    params,
  });
  return response.data;
};

export const searchRegionsData = async (params: { keyword: string }) => {
  const response = await apiRequest<SearchRegionsData>({
    endPoint: `/regions/search`,
    method: 'GET',
    params,
  });
  return response.data;
};
