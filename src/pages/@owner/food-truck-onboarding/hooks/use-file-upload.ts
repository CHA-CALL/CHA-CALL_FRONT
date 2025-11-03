import { z } from 'zod';
import {
  OWNER_MEDIA_ERROR_MESSAGE,
  OWNER_MEDIA_MAX_COUNT,
  OWNER_MEDIA_MIN_COUNT,
} from '@pages/@owner/food-truck-onboarding/constants/owner';
import { CANNOT_UPLOAD_FILE_MB, NOT_ALLOWED_FILE_TYPE } from '@constant/image';
import { isAcceptableFile, isFileSizeValid } from '@utils/image';

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
  );

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
  );
