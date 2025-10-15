import type {
  MemberReservationDetailResponse,
  OwnerReservationDetailResponse,
} from 'apis/data-contracts';
import { apiRequest } from '@api/apiRequest';

export const getMemberReservationDetail = async (reservationId: number) => {
  const response = await apiRequest<MemberReservationDetailResponse>({
    endPoint: `/members/me/reservations/${reservationId}`,
    method: 'GET',
  });
  return response;
};

export const getOwnerReservationDetail = async (reservationId: number) => {
  const response = await apiRequest<OwnerReservationDetailResponse>({
    endPoint: `/owners/me/reservations/${reservationId}`,
    method: 'GET',
  });
  return response;
};
