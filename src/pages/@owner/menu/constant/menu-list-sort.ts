export const SORT_TYPES = {
  LATEST: 'latest',
  OLDEST: 'oldest',
} as const;

export const SORT_OPTIONS = {
  [SORT_TYPES.LATEST]: '최신순',
  [SORT_TYPES.OLDEST]: '오래된순',
} as const;

export type SortType = keyof typeof SORT_OPTIONS;
