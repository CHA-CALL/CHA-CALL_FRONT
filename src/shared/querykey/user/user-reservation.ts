export const USER_GET_RESERVATIONS = {
  ALL: ['user-reservations'],
  DETAIL: (reservationId: number) => [...USER_GET_RESERVATIONS.ALL, 'detail', reservationId],
} as const;
