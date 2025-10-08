export const USER_GET_RESERVATIONS = {
  ALL: ['user-reservations'],
  DETAILS: () => [...USER_GET_RESERVATIONS.ALL, 'details'],
  DETAIL: (reservationId: number) => [
    ...USER_GET_RESERVATIONS.ALL,
    ...USER_GET_RESERVATIONS.DETAILS(),
    reservationId
  ],
} as const;
