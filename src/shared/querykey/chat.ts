export const CHAT_QUERY_KEY = {
  ALL: ['chat'],
  META_DATA: (chatRoomId: number, isOwner: boolean) => [
    'chat',
    'meta-data',
    chatRoomId,
    isOwner,
  ],
  // 예약 상태 조회 쿼리키 위치를 고민중.. 채팅방 내부에서만 사용할 것 같긴함
  RESERVATION_STATUS: (reservationId: number | null) => [
    'chat',
    'reservation-status',
    reservationId,
  ],
} as const;
