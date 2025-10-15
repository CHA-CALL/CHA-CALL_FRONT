export const MEMBER_RESERVATION_DETAIL_KEY = {
  ALL: ['chat-templates'],
  DETAIL: (id: string | undefined) => [MEMBER_RESERVATION_DETAIL_KEY.ALL, id],
} as const;

export const OWNER_RESERVATION_DETAIL_KEY = {
  ALL: ['chat-templates'],
  DETAIL: (id: string | undefined) => [OWNER_RESERVATION_DETAIL_KEY.ALL, id],
} as const;
