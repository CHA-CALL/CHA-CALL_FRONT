import type {
  GetOwnerReservationsData,
  GetMemberReservationsData,
} from 'apis/data-contracts';
import { apiRequest } from '@api/apiRequest';
import type { ReservationState } from '@pages/reservation-history/types/reservation-history';
import { PAGE_SIZE } from '@constant/page-size';

export const getReservationHistory = async (
  isProvider: boolean,
  params: {
    viewType: ReservationState;
    'cursorPagingRequest.cursor'?: number;
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
    params: {
      ...params,
      'cursorPagingRequest.size': PAGE_SIZE,
    },
  });

  return response.data;
};
