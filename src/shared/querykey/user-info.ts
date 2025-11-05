export const USER_INFO = {
  ALL: ['userInfo'],
  DETAIL: (userId: number) => [USER_INFO.ALL, userId],
} as const;
