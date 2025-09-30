import { useState } from 'react';
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

export function useMenuImageInput() {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    const result = MENU_IMAGE_VALIDATOR.safeParse(files);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return false;
    }
    setError(null);
    return true;
  };

  const addFile = (file: File) => {
    if (files.length < MENU_IMAGE_MAX) {
      const newFiles = [...files, file];
      setFiles(newFiles);
      if (error) {
        setError(null);
      }
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    files,
    setFiles,
    addFile,
    removeFile,
    error,
    validate,
    clearError,
  };
}