export const CHAT_QUERY_KEY = {
  ALL: ['chat'],
  DETAIL: (chatRoomId: number) => [...CHAT_QUERY_KEY.ALL, chatRoomId],
  META_DATA: (chatRoomId: number, isOwner: boolean) => [
    ...CHAT_QUERY_KEY.DETAIL(chatRoomId),
    'meta-data',
    isOwner,
  ],
  // 예약 상태 조회 쿼리키 위치를 고민중.. 채팅방 내부에서만 사용할 것 같긴함
  RESERVATION_STATUS: (reservationId: number | null) => [
    ...CHAT_QUERY_KEY.ALL,
    'reservation-status',
    reservationId,
  ],
} as const;
