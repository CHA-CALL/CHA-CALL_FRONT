import { apiRequest } from '@api/apiRequest';
import type {
  CreateReservationData,
  GetReservationData,
  UpdateReservationData,
} from 'apis/data-contracts';

export interface ReservationEstimateRequestData {
  address: string;
  detailAddress: string;
  reservationDates: string[];
  operationHour: string;
  menu: string;
  deposit: number;
  isUseElectricity: boolean;
  etcRequest?: string;
}

export interface CreateReservationEstimateRequest
  extends ReservationEstimateRequestData {
  foodTruckId: number;
  chatRoomId: number;
  reservationUserId: number;
}

export type UpdateReservationEstimateRequest = ReservationEstimateRequestData;

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

export const createReservation = async (
  data: CreateReservationEstimateRequest
) => {
  const response = await apiRequest<CreateReservationData>({
    endPoint: '/reservations',
    method: 'POST',
    data,
  });
  return response.data;
};

export const updateReservation = async (
  reservationId: number,
  data: UpdateReservationEstimateRequest
) => {
  const response = await apiRequest<UpdateReservationData>({
    endPoint: `/reservations/${reservationId}`,
    method: 'PUT',
    data,
  });
  return response.data;
};
