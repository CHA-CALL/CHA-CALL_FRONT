export const MENU_LIMIT = {
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 18,
  DESCRIPTION_MIN_LENGTH: 1,
  DESCRIPTION_MAX_LENGTH: 50,
  PRICE_MIN_LENGTH: 1,
} as const;

export const MENU_ERROR_MESSAGE = {
  NAME_MIN: (min: number) => `메뉴 이름을 ${min}자 이상 입력해주세요.`,
  NAME_MAX: (max: number) => `메뉴 이름을 ${max}자 이하로 입력해주세요.`,
  DESCRIPTION_MIN: (min: number) => `메뉴 설명을 ${min}자 이상 입력해주세요.`,
  DESCRIPTION_MAX: (max: number) => `메뉴 설명을 ${max}자 이하로 입력해주세요.`,
  PRICE_MIN: `가격을 입력해주세요. 숫자만 입력 가능합니다.`,
} as const;
