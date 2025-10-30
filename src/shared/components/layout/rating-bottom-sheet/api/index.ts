import { apiRequest } from '@api/apiRequest';
import type {
  RegisterRatingRequest,
  RegisterRatingsData,
} from 'apis/data-contracts';

// 푸드트럭 평점 등록 api
export const registerRatingFoodTruck = async ({
  reservationId,
  foodTruckId,
  rating,
}: RegisterRatingRequest) => {
  const response = await apiRequest<RegisterRatingsData>({
    endPoint: `/members/me/ratings`,
    method: 'POST',
    data: {
      reservationId,
      foodTruckId,
      rating,
    },
  });
  return response;
};
