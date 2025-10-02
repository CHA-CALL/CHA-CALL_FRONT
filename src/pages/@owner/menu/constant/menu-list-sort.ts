export const SORT_OPTIONS = {
  latest: '최신순',
  oldest: '오래된순',
} as const;

export type SortType = keyof typeof SORT_OPTIONS;