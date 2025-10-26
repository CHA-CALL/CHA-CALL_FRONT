export const OWNER_TEXT = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 10,
} as const;

export const OWNER_TEXT_ERROR_MESSAGE = {
  MIN: (min: number) => `${min}자 이상 입력해주세요.`,
  MAX: (max: number) => `${max}자 미만 입력해주세요.`,
  DUPLICATE: '이미 존재하는 이름입니다.',
  // NOT_VERIFIED: '중복확인을 해주세요.',
} as const;

export const OWNER_MEDIA_MAX_COUNT = {
  BIZ_REG_CERT: 1,
  OTHER_DOCS: 5,
} as const;

export const OWNER_MEDIA_ERROR_MESSAGE = {
  BIZ_REG_CERT: '사업자 등록증을 업로드해야합니다.',
  OTHER_DOCS : '기타 서류는 정확히 5장을 업로드해야합니다.',
} as const;

export const OWNER_MEDIA_TYPE = {
  IMAGE: 'image',
} as const;
