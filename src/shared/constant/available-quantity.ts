export const AVAILABLE_QUANTITY = {
  LESS_THAN_50: '50인분 미만',
  LESS_THAN_100: '100인분 미만',
  LESS_THAN_150: '150인분 미만',
  MORE_THAN_200: '200인분 이상',
  NEED_DISCUSSION: '논의 필요',
} as const;

export type AvailableQuantityKey = keyof typeof AVAILABLE_QUANTITY;
