import { DEPTHS } from '@pages/set-location/constant/location';

export const REGION_QUERY_KEY = {
  ALL: ['regions'],
  DEPTH1: () => [...REGION_QUERY_KEY.ALL, DEPTHS.ONE],
  DEPTH2: (depth1Code: number) => [
    ...REGION_QUERY_KEY.ALL,
    DEPTHS.TWO,
    depth1Code,
  ],
  DEPTH3: (depth1Code: number, depth2Code: number) => [
    ...REGION_QUERY_KEY.ALL,
    DEPTHS.THREE,
    depth1Code,
    depth2Code,
  ],
} as const;
