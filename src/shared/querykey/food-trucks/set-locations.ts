export const SET_LOCATIONS_KEYS = {
  ALL: ['regions'],
  DEPTH: (depth: number) => [SET_LOCATIONS_KEYS.ALL, depth],
  DEPTH_ID: (depth: number, id: number | undefined) => [
    SET_LOCATIONS_KEYS.ALL,
    depth,
    id,
  ],
  SEARCH: (searchText: string | undefined) => [
    SET_LOCATIONS_KEYS.ALL,
    searchText,
  ],
} as const;
