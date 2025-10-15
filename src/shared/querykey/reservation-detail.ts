export const MEMBER_RESERVATION_DETAIL_KEY = {
  ALL: ['chat-templates'],
  DETAIL: (id: number) => [MEMBER_RESERVATION_DETAIL_KEY.ALL, id],
} as const;

export const OWNER_RESERVATION_DETAIL_KEY = {
  ALL: ['chat-templates'],
  DETAIL: (id: number) => [OWNER_RESERVATION_DETAIL_KEY.ALL, id],
} as const;
