import type { FOOD_TRUCK_CATEGORIES } from '@shared/constant/food-truck-categories';
import { AVAILABLE_QUANTITY } from '@shared/constant/available-quantity';
import { NEED_ELECTRICITY } from '@shared/constant/need-electricity';
import { PAYMENT_METHOD } from '@shared/constant/payment-method';

export type FoodTruckCategoryKey = keyof typeof FOOD_TRUCK_CATEGORIES;
export type FoodTruckCategoryValue =
  (typeof FOOD_TRUCK_CATEGORIES)[FoodTruckCategoryKey];

export type AvailableQuantityKey = keyof typeof AVAILABLE_QUANTITY;
export type AvailableQuantityValue =
  | (typeof AVAILABLE_QUANTITY)[AvailableQuantityKey]
  | '';

export type NeedElectricityKey = keyof typeof NEED_ELECTRICITY;
export type NeedElectricityValue =
  | (typeof NEED_ELECTRICITY)[NeedElectricityKey]
  | '';

export type PaymentMethodKey = keyof typeof PAYMENT_METHOD;
export type PaymentMethodValue = (typeof PAYMENT_METHOD)[PaymentMethodKey] | '';

export type FilterValueTypes =
  | FoodTruckCategoryValue
  | AvailableQuantityValue
  | NeedElectricityValue
  | PaymentMethodValue;
