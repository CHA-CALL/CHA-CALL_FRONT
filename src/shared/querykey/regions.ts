import { DEPTHS } from '@shared/components/region/constant/region';

export const REGION_QUERY_KEY = {
  ALL: ['regions'],
  DEPTHS: () => [...REGION_QUERY_KEY.ALL, 'depth'],
  DEPTH1: () => [
    ...REGION_QUERY_KEY.ALL,
    ...REGION_QUERY_KEY.DEPTHS(),
    DEPTHS.ONE,
  ],
  DEPTH2: (depth1Code: number) => [
    ...REGION_QUERY_KEY.ALL,
    ...REGION_QUERY_KEY.DEPTHS(),
    DEPTHS.TWO,
    depth1Code,
  ],
  DEPTH3: (depth1Code: number, depth2Code: number) => [
    ...REGION_QUERY_KEY.ALL,
    ...REGION_QUERY_KEY.DEPTHS(),
    DEPTHS.THREE,
    depth1Code,
    depth2Code,
  ],
  SEARCH: (keyword: string) => [...REGION_QUERY_KEY.ALL, 'search', keyword],
} as const;
