import { z } from 'zod';
import {
  MENU_TEXT,
  MENU_TEXT_ERROR_MESSAGE
} from '@pages/@owner/menu/constant/menu';

export const MENU_PRICE_VALIDATOR = z
  .string().transform((val) => val.replace(/,/g, ''))
  .pipe(z.string()
    .min(
      MENU_TEXT.PRICE_MIN_LENGTH,
      MENU_TEXT_ERROR_MESSAGE.PRICE_MIN(MENU_TEXT.PRICE_MIN_LENGTH)
    )
    .max(
      MENU_TEXT.PRICE_MAX_LENGTH,
      MENU_TEXT_ERROR_MESSAGE.PRICE_MAX(MENU_TEXT.PRICE_MAX_LENGTH)
    )
    .regex(/^\d+$/, MENU_TEXT_ERROR_MESSAGE.PRICE_ONLY_NUMBER)
  );
