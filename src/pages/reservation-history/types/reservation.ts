export const RESERVATION_STATE = {
  UPCOMING: '진행 예정',
  CONFIRMED: '확정 신청',
  COMPLETED: '완료 내역',
  CANCELED: '취소 내역',
};

export type ReservationState =
  (typeof RESERVATION_STATE)[keyof typeof RESERVATION_STATE];
