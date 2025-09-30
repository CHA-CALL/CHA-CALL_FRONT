export const MENU_TEXT = {
  NAME_MAX_LENGTH: 18,
  NAME_MIN_LENGTH: 1,
  DESCRIPTION_MAX_LENGTH: 50,
  DESCRIPTION_MIN_LENGTH: 1,
  PRICE_MAX_LENGTH: 10,
  PRICE_MIN_LENGTH: 1,
} as const;

export const MENU_TEXT_ERROR_MESSAGE = {
  NAME_MIN: (min: number) => `메뉴 이름을 ${min}자 이상 입력해주세요.`,
  NAME_MAX: (max: number) => `메뉴 이름을 ${max}자 이하로 입력해주세요.`,
  DESCRIPTION_MIN: (min: number) => `메뉴 설명을 ${min}자 이상 입력해주세요.`,
  DESCRIPTION_MAX: (max: number) => `메뉴 설명을 ${max}자 이하로 입력해주세요.`,
  PRICE_MIN: (min: number) => `가격을 ${min}자 이상 입력해주세요.`,
  PRICE_MAX: (max: number) => `가격을 ${max}자 이하로 입력해주세요.`,
  PRICE_ONLY_NUMBER: '가격은 숫자만 입력 가능합니다.',
} as const;

export const MENU_IMAGE_MIN = 1;
export const MENU_IMAGE_MAX = 1;

export const MENU_IMAGE_ERROR_MESSAGE = {
  MIN_COUNT: (min: number) => `사진은 ${min}개 이상 업로드 가능합니다.`,
  MAX_COUNT: (max: number) => `사진은 ${max}개까지 업로드 가능합니다.`,
} as const;

export const MENU_IMAGE_TYPE = {
  IMAGE: 'image',
} as const;