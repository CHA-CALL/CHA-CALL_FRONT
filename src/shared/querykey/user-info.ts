export const USER_INFO = {
  ALL: ['userInfo'],
  DETAILS: () => [USER_INFO.ALL, 'details'],
  DETAIL: (userId: number) => [...USER_INFO.DETAILS(), userId],
  CHATS: (isOwner: boolean) => [USER_INFO.ALL, 'chats', isOwner],
  CHAT: (isOwner: boolean, chatId: number) => [
    ...USER_INFO.CHATS(isOwner),
    chatId,
  ],
  ACCOUNTS: () => [USER_INFO.ALL, 'accounts'],
  ACCOUNT: (accountId: number) => [...USER_INFO.ACCOUNTS(), accountId],
  RESERVATIONS: () => [USER_INFO.ALL, 'reservations'],
  RESERVATION: (reservationId: number) => [
    ...USER_INFO.RESERVATIONS(),
    reservationId,
  ],
} as const;
