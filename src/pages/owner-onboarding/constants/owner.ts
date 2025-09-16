export const OWNER_TEXT = {
  MAX_LENGTH: 10,
  MIN_LENGTH: 1,
} as const;

export const OWNER_TEXT_ERROR_MESSAGE = {
  MIN: (min: number) => `${min}자 이상 입력해주세요.`,
  MAX: (max: number) => `${max}자 미만 입력해주세요.`,
  DUPLICATE: "이미 존재하는 이름입니다.",
  NOT_VERIFIED: "중복확인을 해주세요.",
} as const;
export const OWNER_MEDIA_MIN_COUNT = {
  OTHER_DOCS: 1,
} as const;

export const OWNER_MEDIA_MAX_COUNT = {
  BIZ_REG_CERT: 1,
  OTHER_DOCS: 5,
} as const;

export const OWNER_MEDIA_ERROR_MESSAGE = {
  MIN_COUNT: (min: number) => `${min}개 이상 업로드 가능합니다.`,
  MAX_COUNT: (max: number) => `${max}개까지 업로드 가능합니다.`,
  NOT_ALLOWED_FILE_TYPE:
    "지원하지 않는 파일 형식입니다. JPG, JPEG, PNG 파일만 업로드 가능합니다.",
  CANNOT_UPLOAD_FILE: "cannot upload file",
} as const;

export const OWNER_MEDIA_TYPE = {
  IMAGE: "image",
} as const;
