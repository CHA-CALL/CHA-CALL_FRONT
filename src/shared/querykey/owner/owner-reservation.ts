export const OWNER_GET_RESERVATIONS = {
  // ALL: ['owner-reservations'],
  // DETAILS: () => [...OWNER_GET_RESERVATIONS.ALL, 'details'],
  // DETAIL: (reservationId: number) => [
  //   ...OWNER_GET_RESERVATIONS.ALL,
  //   ...OWNER_GET_RESERVATIONS.DETAILS(),
  //   reservationId
  // ],
  ALL: (viewType?: string) => ['owner-reservations', viewType].filter(Boolean),
  DETAILS: () => [...OWNER_GET_RESERVATIONS.ALL(), 'details'],
  DETAIL: (reservationId: number) => [
    ...OWNER_GET_RESERVATIONS.ALL(),
    ...OWNER_GET_RESERVATIONS.DETAILS(),
    reservationId
  ],
} as const;
