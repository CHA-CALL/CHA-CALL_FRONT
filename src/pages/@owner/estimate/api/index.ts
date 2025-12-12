import { apiRequest } from '@api/apiRequest';
import type { BaseResponseReservationIdResponse } from 'apis/data-contracts';

export interface ReservationEstimateData {
  foodTruckId?: number;
  chatRoomId?: number;
  reservationUserId?: number;
  address: string;
  detailAddress: string;
  reservationDates: string[];
  operationHour: string;
  menu: string;
  deposit: number;
  isUseElectricity: boolean;
  etcRequest?: string;
}

export const createReservation = async (data: ReservationEstimateData) => {
  const response = await apiRequest<BaseResponseReservationIdResponse>({
    endPoint: '/reservations',
    method: 'POST',
    data,
  });
  return response.data;
};
