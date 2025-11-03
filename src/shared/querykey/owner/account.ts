export const ACCOUNT_INFO = {
  ALL: ['accountInfo'],
  DETAIL: (accountId: number) => [ACCOUNT_INFO.ALL, accountId],
} as const;
