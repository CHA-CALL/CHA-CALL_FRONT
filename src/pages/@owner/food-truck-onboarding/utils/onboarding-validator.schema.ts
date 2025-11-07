import { z } from 'zod';
import {
  OWNER_MEDIA_ERROR_MESSAGE,
  OWNER_MEDIA_MAX_COUNT,
  OWNER_MEDIA_MIN_COUNT,
  OWNER_TEXT,
  OWNER_TEXT_ERROR_MESSAGE,
} from '@pages/@owner/food-truck-onboarding/constants/owner';
import { CANNOT_UPLOAD_FILE_MB, NOT_ALLOWED_FILE_TYPE } from '@constant/image';
import { isAcceptableFile, isFileSizeValid } from '@utils/image';

export const FOOD_TRUCK_NAME_VALIDATOR = z
  .string()
  .trim()
  .min(
    OWNER_TEXT.MIN_LENGTH,
    OWNER_TEXT_ERROR_MESSAGE.MIN(OWNER_TEXT.MIN_LENGTH)
  )
  .max(
    OWNER_TEXT.MAX_LENGTH,
    OWNER_TEXT_ERROR_MESSAGE.MAX(OWNER_TEXT.MAX_LENGTH)
  );

export const FILE_VALIDATOR = z
  .instanceof(File)
  .refine(
    file => isAcceptableFile(file),
      { message: NOT_ALLOWED_FILE_TYPE }
  )
  .refine(
    file => isFileSizeValid(file),
      { message: CANNOT_UPLOAD_FILE_MB }
  );

export const BIZ_REG_CERT_FILE_VALIDATOR = FILE_VALIDATOR;

export const OTHER_DOCS_FILES_VALIDATOR = z
  .array(FILE_VALIDATOR)
  .min(
    OWNER_MEDIA_MIN_COUNT.OTHER_DOCS,
    OWNER_MEDIA_ERROR_MESSAGE.MIN_COUNT(OWNER_MEDIA_MIN_COUNT.OTHER_DOCS)
  )
  .max(
    OWNER_MEDIA_MAX_COUNT.OTHER_DOCS,
    OWNER_MEDIA_ERROR_MESSAGE.MAX_COUNT(OWNER_MEDIA_MAX_COUNT.OTHER_DOCS)
  );

export const ONBOARDING_SCHEMA = z.object({
  name: FOOD_TRUCK_NAME_VALIDATOR,
  bizRegCert: BIZ_REG_CERT_FILE_VALIDATOR,
  otherDocs: OTHER_DOCS_FILES_VALIDATOR,
});

export type OnboardingFormData = z.infer<typeof ONBOARDING_SCHEMA>;
