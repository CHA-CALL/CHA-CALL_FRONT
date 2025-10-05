// import type { ReservationState } from '@pages/reservation-history/types/reservation';

export const OWNER_GET_RESERVATIONS = {
  ALL: ['reservations'],
  DETAIL: (reservationId: number) => [...OWNER_GET_RESERVATIONS.ALL, 'detail', reservationId],
} as const;
