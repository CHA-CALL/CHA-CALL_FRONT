export const FOOD_TRUCK_CATEGORIES = {
  ALL: '전체',
  KOREAN: '한식',
  CHINESE: '중식',
  JAPANESE: '일식',
  WESTERN: '양식',
  SNACK: '분식',
  CAFE_DESSERT: '카페/디저트',
  ETC: '기타',
} as const;

export const AVAILABLE_QUANTITY = {
  LESS_THAN_50: '50인분 미만',
  LESS_THAN_100: '100인분 미만',
  LESS_THAN_150: '150인분 미만',
  MORE_THAN_200: '200인분 이상',
  NEED_DISCUSSION: '논의 필요',
} as const;

export const NEED_ELECTRICITY = {
  REQUIRED: '가능',
  NOT_REQUIRED: '불가능',
  NEED_DISCUSSION: '논의 필요',
} as const;

export const PAYMENT_METHOD = {
  CARD: '카드',
  BANK_TRANSFER: '계좌이체',
  ANY: '무관',
} as const;
