import type { EstimateFormData } from '@pages/@owner/estimate/schemas/estimate.schema';
import type { ReservationEstimateRequestData } from '@pages/@owner/estimate/api';

// 서버에 알맞은 형식으로 포맷
export default function formatEstimate(estimateFormData: EstimateFormData) {
  const formattedDates = estimateFormData.availableDates
    .filter(date => date.startDate)
    .map(date => {
      if (date.endDate) {
        return `${date.startDate} ~ ${date.endDate}`;
      }
      return `${date.startDate} ~ ${date.startDate}`;
    });

  const formattedEstimate: ReservationEstimateRequestData = {
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
}
