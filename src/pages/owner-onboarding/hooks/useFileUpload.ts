import { z } from "zod";
import {
  OWNER_MEDIA_ERROR_MESSAGE,
  OWNER_MEDIA_MAX_COUNT,
  OWNER_MEDIA_MIN_COUNT,
} from "@pages/owner-onboarding/constants/owner";

import { isAcceptableFile, isFileSizeValid } from "@shared/utils/image";

export const BIZ_REG_CERT_FILE_VALIDATOR = z
  .instanceof(File)
  .refine(
    (file) => {
      return isAcceptableFile(file);
    },
    {
      message: OWNER_MEDIA_ERROR_MESSAGE.NOT_ALLOWED_FILE_TYPE,
    }
  )
  .refine(
    (file) => {
      return isFileSizeValid(file);
    },
    {
      message: OWNER_MEDIA_ERROR_MESSAGE.CANNOT_UPLOAD_FILE,
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
  .refine(
    (files) => {
      return files.every((file) => isAcceptableFile(file));
    },
    {
      message: OWNER_MEDIA_ERROR_MESSAGE.NOT_ALLOWED_FILE_TYPE,
    }
  )
  .refine(
    (files) => {
      return files.every((file) => isFileSizeValid(file));
    },
    {
      message: OWNER_MEDIA_ERROR_MESSAGE.CANNOT_UPLOAD_FILE,
    }
  )
  .optional();
