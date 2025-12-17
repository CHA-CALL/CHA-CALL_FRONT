import { apiRequest } from '@api/apiRequest';
import {
  type UpdateReservationStatusData,
  type GetChatRoomMetaDataData,
  type GetReservationStatusData,
  type UpdateReservationStatusRequest,
} from 'apis/data-contracts';

// 채팅방 메타데이터 조회
export const getChatRoomMetaData = async (
  chatRoomId: number,
  isOwner: boolean
) => {
  const response = await apiRequest<GetChatRoomMetaDataData>({
    endPoint: `/chat/rooms/${chatRoomId}`,
    method: 'GET',
    params: {
      isOwner,
    },
  });
  return response.data;
};

// 채팅방 예약 상태 조회
export const getReservationStatus = async (reservationId: number | null) => {
  if (reservationId === null) {
    throw new Error(
      'reservationId가 null일 때는 해당 함수를 실행할 수 없습니다.'
    );
  }
  const response = await apiRequest<GetReservationStatusData>({
    endPoint: `/reservations/${reservationId}/status`,
    method: 'GET',
  });
  return response.data;
};

export const updateReservationStatus = async (
  reservationId: number | null,
  reservationStatus: UpdateReservationStatusRequest
) => {
  if (reservationId === null) {
    throw new Error(
      'reservationId가 null일 때는 해당 함수를 실행할 수 없습니다.'
    );
  }
  const response = await apiRequest<UpdateReservationStatusData>({
    endPoint: `/reservations/${reservationId}/status`,
    method: 'PATCH',
    data: reservationStatus,
  });
  return response.data;
};
