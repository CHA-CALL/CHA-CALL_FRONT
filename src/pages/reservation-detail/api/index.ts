import type {
  BaseResponseMemberReservationDetailResponse,
  BaseResponseOwnerReservationDetailResponse,
} from 'apis/data-contracts';
import { apiRequest } from '@api/apiRequest';

export const getMemberReservationDetail = async (reservationId: number) => {
  const response =
    await apiRequest<BaseResponseMemberReservationDetailResponse>({
      endPoint: `/members/me/reservations/${reservationId}`,
      method: 'GET',
    });
  return response;
};

export const getOwnerReservationDetail = async (reservationId: number) => {
  const response = await apiRequest<BaseResponseOwnerReservationDetailResponse>(
    {
      endPoint: `/owners/me/reservations/${reservationId}`,
      method: 'GET',
    }
  );
  return response;
};
