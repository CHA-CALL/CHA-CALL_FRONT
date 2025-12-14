export const VIEWED_STATUS = {
  ON: 'ON',
  OFF: 'OFF',
} as const;

export type ViewedStatus = (typeof VIEWED_STATUS)[keyof typeof VIEWED_STATUS];
