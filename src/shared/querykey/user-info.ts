export const OWNER_CHAT_TEMPLATES = {
  ALL: ['chat-templates'],
  DETAIL: (id: number) => [OWNER_CHAT_TEMPLATES.ALL, id],
} as const;

export const USER_INFO = {
  ALL: ['userInfo'],
  DETAIL: (userId: number) => [USER_INFO.ALL, userId],
} as const;
