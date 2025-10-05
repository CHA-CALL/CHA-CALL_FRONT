export const OWNER_CHAT_TEMPLATES = {
  ALL: ['chat-templates'],
  DETAIL: (id: number) => [OWNER_CHAT_TEMPLATES.ALL, id],
} as const;
