export const NEED_ELECTRICITY = {
  REQUIRED: '필요',
  NOT_REQUIRED: '필요 없음',
  NEED_DISCUSSION: '논의 필요',
} as const;

export type NeedElectricityKey = keyof typeof NEED_ELECTRICITY;
