export const PAYMENT_METHOD = {
  CARD: '카드',
  BANK_TRANSFER: '계좌 이체',
  ANY: '아무거나',
} as const;

export type PaymentMethodKey = keyof typeof PAYMENT_METHOD;
