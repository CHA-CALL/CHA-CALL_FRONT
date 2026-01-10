import type {
  FoodTruckDetailResponse,
  MyFoodTruckMenuResponse,
} from 'apis/data-contracts';

import { normalizeEnumValue } from '@utils/normalize-enum-value';
import { AVAILABLE_QUANTITY } from '@constant/available-quantity';
import { NEED_ELECTRICITY } from '@constant/need-electricity';
import { PAYMENT_METHOD } from '@constant/payment-method';
import { formatStringDatesToAvailableDates } from '@utils/date';

export const resetFoodTruckFormValue = (
  foodTruckDetailData: FoodTruckDetailResponse,
  menus?: MyFoodTruckMenuResponse[]
) => {
  const availableQuantity = normalizeEnumValue(
    AVAILABLE_QUANTITY,
    foodTruckDetailData.availableQuantity
  );
  const needElectricity = normalizeEnumValue(
    NEED_ELECTRICITY,
    foodTruckDetailData.needElectricity
  );
  const payment = normalizeEnumValue(
    PAYMENT_METHOD,
    foodTruckDetailData.paymentMethod
  );
  if (!availableQuantity || !needElectricity || !payment) {
    return {
      isError: true,
    };
  }

  return {
    isError: false,
    values: {
      name: foodTruckDetailData.name,
      isNameChecked: true,
      isNameDuplicated: false,
      description: foodTruckDetailData.description,
      phoneNumber: foodTruckDetailData.phoneNumber,
      regionCodes: foodTruckDetailData.regionCodes,
      availableQuantity: availableQuantity,
      needElectricity: needElectricity,
      paymentMethod: payment,
      menuCategories: foodTruckDetailData.menuCategories,
      photoUrls: foodTruckDetailData.photoUrl,
      operatingInfo: foodTruckDetailData.operatingInfo,
      option: foodTruckDetailData.option,
      availableDates: formatStringDatesToAvailableDates(
        foodTruckDetailData.availableDates ?? []
      ),
      activeTime: foodTruckDetailData.activeTime,
      timeDiscussRequired: foodTruckDetailData.timeDiscussRequired,
      menus: menus && menus.length > 0,
    },
  };
};
