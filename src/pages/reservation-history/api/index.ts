import type {
  GetOwnerReservationsData,
  GetMemberReservationsData
} from 'apis/data-contracts';
import { apiRequest } from '@api/apiRequest';
import type { ReservationState } from '@pages/reservation-history/types/reservation';

export const getOwnerReservations = async (params: {
  viewType: ReservationState;
  cursor?: number;
  size?: number;
}) => {
  const response = await apiRequest<GetOwnerReservationsData>({
    endPoint: '/owners/me/reservations',
    method: 'GET',
    params,
  });
  return response.data;
};

export const getUserReservations = async (params: {
  viewType: ReservationState;
  cursor?: number;
  size?: number;
}) => {
  const response = await apiRequest<GetMemberReservationsData>({
    endPoint: '/members/me/reservations',
    method: 'GET',
    params,
  });
  return response.data;
};
