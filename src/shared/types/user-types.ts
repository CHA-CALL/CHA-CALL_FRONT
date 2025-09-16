export const USER_TYPE = {
  Guest: 'guest',
  Customer: 'customer',
  Manager: 'manager',
} as const;

export type UserTypeKey = keyof typeof USER_TYPE;
export type UserType = (typeof USER_TYPE)[UserTypeKey];
