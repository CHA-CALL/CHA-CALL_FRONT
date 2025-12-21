import { apiRequest } from '@api/apiRequest';
import type {
  CreateReservationData,
  CreateReservationRequest,
  GetReservationData,
  UpdateReservationData,
  UpdateReservationRequest,
} from 'apis/data-contracts';

// 예약 견적서 조회
export const getReservation = async (reservationId: number | null) => {
  if (reservationId === null) {
    throw new Error(
      'reservationId가 null일 때는 해당 함수를 실행할 수 없습니다.'
    );
  }
  const response = await apiRequest<GetReservationData>({
    endPoint: `/reservations/${reservationId}`,
    method: 'GET',
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
  reservationId: number | null,
  data: UpdateReservationRequest
) => {
  if (reservationId === null) {
    throw new Error(
      'reservationId가 null일 때는 해당 함수를 실행할 수 없습니다.'
    );
  }

  const response = await apiRequest<UpdateReservationData>({
    endPoint: `/reservations/${reservationId}`,
    method: 'PUT',
    data,
  });
  return response.data;
};
