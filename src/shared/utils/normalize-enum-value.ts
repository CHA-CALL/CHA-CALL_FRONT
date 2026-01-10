export const normalizeEnumValue = <T extends Record<string, string>>(
  enumObj: T,
  value?: string
): T[keyof T] | undefined => {
  if (!value) return undefined;

  const values = Object.values(enumObj) as Array<T[keyof T]>;
  return values.includes(value as T[keyof T])
    ? (value as T[keyof T])
    : undefined;
};
