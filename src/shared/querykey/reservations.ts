export const RESERVATION_QUERY_KEY = {
  ALL: ['reservations'],
  LIST: (isProvider: boolean, viewType: string) => [
    ...RESERVATION_QUERY_KEY.ALL,
    isProvider ? 'provider' : 'client',
    viewType,
  ],
} as const;
