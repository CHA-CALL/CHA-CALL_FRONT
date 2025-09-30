import { useState } from 'react';
import { z } from 'zod';
import {
  MENU_TEXT,
  MENU_TEXT_ERROR_MESSAGE
} from '@pages/@owner/menu/constant/menu';

export const MENU_DESCRIPTION_VALIDATOR = z.string()
  .min(
    MENU_TEXT.DESCRIPTION_MIN_LENGTH,
    MENU_TEXT_ERROR_MESSAGE.DESCRIPTION_MIN(MENU_TEXT.DESCRIPTION_MIN_LENGTH)
  )
  .max(
    MENU_TEXT.DESCRIPTION_MAX_LENGTH,
    MENU_TEXT_ERROR_MESSAGE.DESCRIPTION_MAX(MENU_TEXT.DESCRIPTION_MAX_LENGTH)
  );

export function useMenuDescriptionInput() {
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    const result = MENU_DESCRIPTION_VALIDATOR.safeParse(description);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return false;
    }
    setError(null);
    return true;
  };

  const clearError = () => {
    setError(null);
  };

  return {
    description,
    setDescription,
    error,
    validate,
    clearError,
  };
}
