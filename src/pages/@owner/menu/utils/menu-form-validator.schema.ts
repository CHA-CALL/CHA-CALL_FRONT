import { z } from 'zod';
import {
  MENU_LIMIT,
  MENU_ERROR_MESSAGE,
} from '@pages/@owner/menu/constant/menu';
import {
  CANNOT_UPLOAD_FILE_MB,
  NOT_ALLOWED_FILE_TYPE,
} from '@shared/constant/image';
import { isAcceptableFile, isFileSizeValid } from '@shared/utils/image';
import { formatPrice } from '@shared/utils/price-formatter';

export const MENU_NAME_VALIDATOR = z
  .string()
  .min(
    MENU_LIMIT.NAME_MIN_LENGTH,
    MENU_ERROR_MESSAGE.NAME_MIN(MENU_LIMIT.NAME_MIN_LENGTH)
  )
  .max(
    MENU_LIMIT.NAME_MAX_LENGTH,
    MENU_ERROR_MESSAGE.NAME_MAX(MENU_LIMIT.NAME_MAX_LENGTH)
  );

export const MENU_DESCRIPTION_VALIDATOR = z
  .string()
  .min(
    MENU_LIMIT.DESCRIPTION_MIN_LENGTH,
    MENU_ERROR_MESSAGE.DESCRIPTION_MIN(MENU_LIMIT.DESCRIPTION_MIN_LENGTH)
  )
  .max(
    MENU_LIMIT.DESCRIPTION_MAX_LENGTH,
    MENU_ERROR_MESSAGE.DESCRIPTION_MAX(MENU_LIMIT.DESCRIPTION_MAX_LENGTH)
  );

export const MENU_PRICE_VALIDATOR = z
  .string()
  .refine(
    val => val.replace(/,/g, '').length >= MENU_LIMIT.PRICE_MIN_LENGTH,
    MENU_ERROR_MESSAGE.PRICE_MIN
  )
  .transform(val => formatPrice(Number(val)));

export const MENU_IMAGE_VALIDATOR = z
  .union([z.instanceof(File), z.undefined(), z.null()])
  .refine(file => file instanceof File, {
    message: MENU_ERROR_MESSAGE.IMAGE_MIN_COUNT(MENU_LIMIT.IMAGE_MIN_COUNT),
  })
  .refine(
    file => (file ? isAcceptableFile(file) : true),
    { message: NOT_ALLOWED_FILE_TYPE }
  )
  .refine(
    file => (file ? isFileSizeValid(file) : true),
    { message: CANNOT_UPLOAD_FILE_MB }
  );
