export const ROLE = {
  LOGOUT: 'logout',
  PROVIDER: 'provider',
  CLIENT: 'client',
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];
