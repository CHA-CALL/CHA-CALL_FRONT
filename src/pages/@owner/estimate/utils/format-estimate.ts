import type {
  CreateReservationRequest,
  UpdateReservationRequest,
} from 'apis/data-contracts';
import { formatAvailableDatesToString } from '@utils/date';
import type { EstimateFormData } from '@pages/@owner/estimate/schemas/estimate.schema';

// 예약 견적서 작성 요청 body 형식으로 포맷
export const formatCreateEstimate = (
  foodTruckId: number,
  chatRoomId: number,
  reservationUserId: number,
  estimateFormData: EstimateFormData
) => {
  const formattedEstimate: CreateReservationRequest = {
    foodTruckId,
    chatRoomId,
    reservationUserId,
    address: estimateFormData.location,
    detailAddress: estimateFormData.detailLocation,
    reservationDates: formatAvailableDatesToString(
      estimateFormData.availableDates
    ),
    operationHour: estimateFormData.activeTime,
    menu: estimateFormData.food,
    deposit: estimateFormData.price,
    isUseElectricity: estimateFormData.needElectricity,
    etcRequest: estimateFormData.etc,
  };

  return formattedEstimate;
};

// 예약 견적서 수정 요청 body 형식으로 포맷
export const formatUpdateEstimate = (estimateFormData: EstimateFormData) => {
  const formattedEstimate: UpdateReservationRequest = {
    address: estimateFormData.location,
    detailAddress: estimateFormData.detailLocation,
    reservationDates: formatAvailableDatesToString(
      estimateFormData.availableDates
    ),
    operationHour: estimateFormData.activeTime,
    menu: estimateFormData.food,
    deposit: estimateFormData.price,
    isUseElectricity: estimateFormData.needElectricity,
    etcRequest: estimateFormData.etc,
  };

  return formattedEstimate;
};
