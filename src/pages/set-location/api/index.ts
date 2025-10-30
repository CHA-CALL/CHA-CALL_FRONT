import { apiRequest } from '@api/apiRequest';
import {
  type GetRegionsData,
  type SearchRegionsData,
} from 'apis/data-contracts';

const getRegions = async (depth: number, parentCode?: number | null) => {
  const response = await apiRequest<GetRegionsData>({
    endPoint: '/regions',
    method: 'GET',
    params: {
      depth: depth.toString(),
      ...(parentCode && { parentCode: parentCode.toString() }),
    },
  });
  return response;
};

export { getRegions };

export const searchRegions = async (keyword: string) => {
  const response = await apiRequest<SearchRegionsData>({
    endPoint: '/regions/search',
    method: 'GET',
    params: { keyword },
  });
  return response;
};
