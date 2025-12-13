import { apiRequest } from '@api/apiRequest';
import type {
  CreateReservationData,
  CreateReservationRequest,
  GetReservationData,
  UpdateReservationData,
  UpdateReservationRequest,
} from 'apis/data-contracts';

// 예약 견적서 조회
export const getReservation = async (
  reservationId: number,
  isOwner: boolean
) => {
  const response = await apiRequest<GetReservationData>({
    endPoint: `/reservations/${reservationId}`,
    method: 'GET',
    params: { isOwner },
  });
  return response.data;
};

// 예약 견적서 작성
export const createReservation = async (data: CreateReservationRequest) => {
  const response = await apiRequest<CreateReservationData>({
    endPoint: '/reservations',
    method: 'POST',
    data,
  });
  return response.data;
};

// 예약 견적서 수정
export const updateReservation = async (
  reservationId: number,
  data: UpdateReservationRequest
) => {
  const response = await apiRequest<UpdateReservationData>({
    endPoint: `/reservations/${reservationId}`,
    method: 'PUT',
    data,
  });
  return response.data;
};
