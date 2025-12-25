import type {
  CreateReservationRequest,
  UpdateReservationRequest,
} from 'apis/data-contracts';
import type { EstimateFormData } from '@pages/@owner/estimate/schemas/estimate.schema';

// 예약 견적서 작성 요청 body 형식으로 포맷
export const formatCreateEstimate = (
  foodTruckId: number,
  chatRoomId: number,
  reservationUserId: number,
  estimateFormData: EstimateFormData
) => {
  const formattedDates = estimateFormData.availableDates
    .filter(date => date.startDate)
    .map(date => {
      if (date.endDate) {
        return `${date.startDate} ~ ${date.endDate}`;
      }
      return `${date.startDate} ~ ${date.startDate}`;
    });

  const formattedEstimate: CreateReservationRequest = {
    foodTruckId,
    chatRoomId,
    reservationUserId,
    address: estimateFormData.location,
    detailAddress: estimateFormData.detailLocation,
    reservationDates: formattedDates,
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
  const formattedDates = estimateFormData.availableDates
    .filter(date => date.startDate)
    .map(date => {
      if (date.endDate) {
        return `${date.startDate} ~ ${date.endDate}`;
      }
      return `${date.startDate} ~ ${date.startDate}`;
    });

  const formattedEstimate: UpdateReservationRequest = {
    address: estimateFormData.location,
    detailAddress: estimateFormData.detailLocation,
    reservationDates: formattedDates,
    operationHour: estimateFormData.activeTime,
    menu: estimateFormData.food,
    deposit: estimateFormData.price,
    isUseElectricity: estimateFormData.needElectricity,
    etcRequest: estimateFormData.etc,
  };

  return formattedEstimate;
};
