export const RESERVATION_STATE = {
  UPCOMING: 'upcoming',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELED: 'canceled',
};

export type ReservationState =
  (typeof RESERVATION_STATE)[keyof typeof RESERVATION_STATE];
