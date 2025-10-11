import type { ParamValue } from '@api/apiRequest';
import type {
  AVAILABLE_QUANTITY,
  NEED_ELECTRICITY,
  PAYMENT_METHOD,
} from '@pages/filter/constant/filter-option-constants';

export interface FoodTrucksFilterType {
  regionCodes?: string[] | null;
  schedules?: string[] | null;
  availableQuantity?: (typeof AVAILABLE_QUANTITY)[number] | null;
  categories?: string[] | null;
  needElectricity?: (typeof NEED_ELECTRICITY)[number] | null;
  paymentMethod?: (typeof PAYMENT_METHOD)[number] | null;

  [key: string]: ParamValue;
}
