import { z } from 'zod';
import {
  MENU_TEXT,
  MENU_TEXT_ERROR_MESSAGE
} from '@pages/@owner/menu/constant/menu';

export const MENU_NAME_VALIDATOR = z.string().trim()
  .min(
    MENU_TEXT.NAME_MIN_LENGTH,
    MENU_TEXT_ERROR_MESSAGE.NAME_MIN(MENU_TEXT.NAME_MIN_LENGTH)
  )
  .max(
    MENU_TEXT.NAME_MAX_LENGTH,
    MENU_TEXT_ERROR_MESSAGE.NAME_MAX(MENU_TEXT.NAME_MAX_LENGTH)
  );
