export type ReservationMessageType =
  | 'CONFIRMATION_SENT'
  | 'CONFIRMATION_REQUEST'
  | 'RESERVATION_CONFIRMED';

export const RESERVATION_MESSAGE = {
  CONFIRMATION_SENT: {
    title: '예약 확정서를 보냈어요!',
    buttonText: '확인하기',
  },
  CONFIRMATION_REQUEST: {
    title: '예약 확정을 요청했어요!',
    buttonText: '수락하기',
  },
  RESERVATION_CONFIRMED: {
    title: '예약이 확정되었습니다.',
    buttonText: '상세내역',
  },
} as const;
