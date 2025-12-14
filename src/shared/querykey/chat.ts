export const CHAT_QUERY_KEY = {
  ALL: ['chat'],
  META_DATA: (chatRoomId: number, isOwner: boolean) => [
    'chat',
    'meta-data',
    chatRoomId,
    isOwner,
  ],
} as const;
