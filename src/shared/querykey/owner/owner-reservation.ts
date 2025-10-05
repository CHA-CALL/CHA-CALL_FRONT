export const OWNER_GET_RESERVATIONS = {
  ALL: ['owner-reservations'],
  DETAIL: (reservationId: number) => [...OWNER_GET_RESERVATIONS.ALL, 'detail', reservationId],
} as const;
