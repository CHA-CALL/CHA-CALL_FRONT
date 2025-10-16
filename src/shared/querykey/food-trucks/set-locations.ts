export const SET_REGIONS_KEYS = {
  ALL: ['regions'],
  DEPTH: (depth: number) => [SET_REGIONS_KEYS.ALL, depth],
  DEPTH_ID: (depth: number, id: number | undefined) => [
    SET_REGIONS_KEYS.ALL,
    depth,
    id,
  ],
  SEARCH: (searchText: string | undefined) => [
    SET_REGIONS_KEYS.ALL,
    searchText,
  ],
} as const;
