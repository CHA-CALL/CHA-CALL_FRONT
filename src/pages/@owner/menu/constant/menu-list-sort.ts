export const SORT_TYPES = {
  LATEST: '최신순',
  OLDEST: '오래된순',
} as const;

export type SortType = (typeof SORT_TYPES)[keyof typeof SORT_TYPES];
