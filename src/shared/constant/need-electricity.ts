export const NEED_ELECTRICITY = {
  REQUIRED: '필요',
  NOT_REQUIRED: '불필요',
  NEED_DISCUSSION: '논의 필요',
} as const;

export type NeedElectricityKey = keyof typeof NEED_ELECTRICITY;
