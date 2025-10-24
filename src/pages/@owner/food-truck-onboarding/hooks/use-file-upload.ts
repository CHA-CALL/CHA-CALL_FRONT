import { z } from 'zod';
import {
  OWNER_MEDIA_ERROR_MESSAGE,
  OWNER_MEDIA_MAX_COUNT,
  OWNER_MEDIA_MIN_COUNT,
} from '@pages/@owner/food-truck-onboarding/constants/owner';
import {
  CANNOT_UPLOAD_FILE_MB,
  NOT_ALLOWED_FILE_TYPE,
} from '@shared/constant/image';
import { isAcceptableFile, isFileSizeValid } from '@shared/utils/image';

export const BIZ_REG_CERT_FILE_VALIDATOR = z
  .instanceof(File)
  .refine(
    file => {
      return isAcceptableFile(file);
    },
    {
      message: NOT_ALLOWED_FILE_TYPE,
    }
  )
  .refine(
    file => {
      return isFileSizeValid(file);
    },
    {
      message: CANNOT_UPLOAD_FILE_MB,
    }
  )
  .optional();

export const OTHER_DOCS_FILES_VALIDATOR = z
  .array(z.instanceof(File))
  .min(
    OWNER_MEDIA_MIN_COUNT.OTHER_DOCS,
    OWNER_MEDIA_ERROR_MESSAGE.MIN_COUNT(OWNER_MEDIA_MIN_COUNT.OTHER_DOCS)
  )
  .max(
    OWNER_MEDIA_MAX_COUNT.OTHER_DOCS,
    OWNER_MEDIA_ERROR_MESSAGE.MAX_COUNT(OWNER_MEDIA_MAX_COUNT.OTHER_DOCS)
  )
  // TODO: 요구사항에 따라 기타서류 개수 수정
  // .length(5, '기타 서류는 정확히 5장을 업로드해야합니다.')
  .refine(
    files => {
      return files.every(file => isAcceptableFile(file));
    },
    {
      message: NOT_ALLOWED_FILE_TYPE,
    }
  )
  .refine(
    files => {
      return files.every(file => isFileSizeValid(file));
    },
    {
      message: CANNOT_UPLOAD_FILE_MB,
    }
  )
  .optional();
