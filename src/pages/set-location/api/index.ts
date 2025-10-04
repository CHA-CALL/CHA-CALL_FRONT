import { apiRequest } from '@api/apiRequest';
import { type GetRegionsData } from '@../../apis/data-contracts';

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
