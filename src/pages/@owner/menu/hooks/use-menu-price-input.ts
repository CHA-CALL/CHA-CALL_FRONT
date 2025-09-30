import { useState } from 'react';
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

export function useMenuPriceInput() {
  const [price, setPrice] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    const result = MENU_PRICE_VALIDATOR.safeParse(price.replace(/,/g, ''));
    if (!result.success) {
      setError(result.error.message);
      return false;
    }
    setError(null);
    return true;
  };

  const clearError = () => {
    setError(null);
  };

  return {
    price,
    setPrice,
    error,
    validate,
    clearError,
  };
}
