export const ROLE = {
  PRESIDENT: 'president',
  USER: 'user',
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];
