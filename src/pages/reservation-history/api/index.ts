import type {
  GetOwnerReservationsData,
  GetMemberReservationsData
} from 'apis/data-contracts';
import { apiRequest } from '@api/apiRequest';
import type { ReservationState } from '@pages/reservation-history/types/reservation';

export const getReservationHistory = async (
  isProvider: boolean,
  params: {
    viewType: ReservationState;
    'cursorPagingRequest.cursor'?: number;
    'cursorPagingRequest.size'?: number;
  }
) => {
  const endPoint = isProvider
    ? '/owners/me/reservations'
    : '/members/me/reservations';

  const response = await apiRequest<
    GetOwnerReservationsData | GetMemberReservationsData
  >({
    endPoint,
    method: 'GET',
    params,
  });

  return response.data;
};
