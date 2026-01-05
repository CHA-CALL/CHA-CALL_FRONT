import { formatAvailableDatesToString } from '@utils/date';

import type { UpdateFoodTruckInfoApiRequest } from '@pages/@owner/food-truck-form/api';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/schemas/food-truck-form.schema';

export const formatFoodTruckForm = (
  formData: FoodTruckFormData
): UpdateFoodTruckInfoApiRequest => {
  return {
    name: formData.name,
    description: formData.description,
    phoneNumber: formData.phoneNumber,
    activeTime: formData.activeTime,
    timeDiscussRequired: formData.timeDiscussRequired,
    foodTruckServiceAreas: formData.regionCodes.map(region => region.code!),
    menuCategories: formData.menuCategories,
    availableQuantity: formData.availableQuantity,
    needElectricity: formData.needElectricity,
    paymentMethod: formData.paymentMethod,
    availableDates: formatAvailableDatesToString(formData.availableDates),
    photoUrls: formData.photoUrls,
    operatingInfo: formData.operatingInfo,
    option: formData.option,
  };
};
