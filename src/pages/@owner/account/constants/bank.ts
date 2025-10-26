export const BANK = [
  '은행을 선택해주세요',
  'KB국민은행',
  '신한은행',
  '우리은행',
  '하나은행',
  'IBK기업은행',
  'KDB산업은행',
  'SC제일은행',
  '카카오뱅크',
] as const;

export type Bank = (typeof BANK)[number];
