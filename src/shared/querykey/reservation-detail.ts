export const RESERVATION_DETAIL_KEY = {
  ALL: ['reservation-detail'],
  DETAIL: (isProvider: boolean, id: string | undefined) => [
    RESERVATION_DETAIL_KEY.ALL,
    isProvider,
    id,
  ],
} as const;
