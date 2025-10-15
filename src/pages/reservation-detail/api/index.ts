import type {
  BaseResponseMemberReservationDetailResponse,
  BaseResponseOwnerReservationDetailResponse,
} from 'apis/data-contracts';
import { apiRequest } from '@api/apiRequest';

export const getMemberReservationDetail = async (reservationId?: string) => {
  const response =
    await apiRequest<BaseResponseMemberReservationDetailResponse>({
      endPoint: `/members/me/reservations/${reservationId}`,
      method: 'GET',
    });
  return response.data;
};

export const getOwnerReservationDetail = async (reservationId?: string) => {
  const response = await apiRequest<BaseResponseOwnerReservationDetailResponse>(
    {
      endPoint: `/owners/me/reservations/${reservationId}`,
      method: 'GET',
    }
  );
  return response.data;
};
