import { z } from 'zod';
import {
  MENU_IMAGE_MIN,
  MENU_IMAGE_MAX,
  MENU_IMAGE_ERROR_MESSAGE
} from '@pages/@owner/menu/constant/menu';

export const MENU_IMAGE_VALIDATOR = z
  .array(z.any())
  .min(
    MENU_IMAGE_MIN,
    MENU_IMAGE_ERROR_MESSAGE.MIN_COUNT(MENU_IMAGE_MIN)
  )
  .max(
    MENU_IMAGE_MAX,
    MENU_IMAGE_ERROR_MESSAGE.MAX_COUNT(MENU_IMAGE_MAX)
  );
