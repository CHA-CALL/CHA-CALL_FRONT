export const PAYMENT_METHOD = {
  CARD: '카드',
  BANK_TRANSFER: '계좌이체',
  ANY: '무관',
} as const;

export type PaymentMethodKey = keyof typeof PAYMENT_METHOD;
