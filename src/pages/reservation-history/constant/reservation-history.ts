import { RESERVATION_STATE } from '../types/reservation';

export const OwnerReservationHistoryTabs = [
  {
    id: RESERVATION_STATE.UPCOMING,
    label: '진행예정',
  },
  {
    id: RESERVATION_STATE.CONFIRMED,
    label: '확정신청',
  },
  {
    id: RESERVATION_STATE.COMPLETED,
    label: '완료내역',
  },
  {
    id: RESERVATION_STATE.CANCELED,
    label: '취소내역',
  },
];

export const UserReservationHistoryTabs = [
  {
    id: RESERVATION_STATE.UPCOMING,
    label: '진행예정',
  },
  {
    id: RESERVATION_STATE.COMPLETED,
    label: '완료내역',
  },
  {
    id: RESERVATION_STATE.CANCELED,
    label: '취소내역',
  },
];
