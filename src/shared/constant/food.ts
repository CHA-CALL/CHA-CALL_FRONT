export const FOOD_CATEGORIES = {
  KOREAN: '한식',
  CHINESE: '중식',
  JAPANESE: '일식',
  WESTERN: '양식',
  SNACK: '분식',
  CAFE_DESSERT: '카페/디저트',
  ETC: '기타',
} as const;

export type FoodCategoriesKey = keyof typeof FOOD_CATEGORIES;
