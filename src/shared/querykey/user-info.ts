export const USER_INFO = {
  ALL: ['userInfo'],
  DETAILS: () => [USER_INFO.ALL, 'details'],
  DETAIL: (userId: number) => [...USER_INFO.DETAILS(), userId],
  CHATS: () => [USER_INFO.ALL, 'chats'],
  CHAT: (chatId: number) => [...USER_INFO.CHATS(), chatId],
  ACCOUNTS: () => [USER_INFO.ALL, 'accounts'],
  ACCOUNT: (accountId: number) => [...USER_INFO.ACCOUNTS(), accountId],
} as const;
