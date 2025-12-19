import {
  ALLOWED_FILE_EXTENSIONS,
  CANNOT_UPLOAD_FILE_MB,
  MAX_MB,
  NOT_ALLOWED_FILE_TYPE,
} from '@constant/image';
import { z } from 'zod';

const MAX_FILE_SIZE_BYTES = MAX_MB * 1024 * 1024;

export const imageFileSchema = z
  .instanceof(File)
  .refine(file => file.size <= MAX_FILE_SIZE_BYTES, {
    message: CANNOT_UPLOAD_FILE_MB,
  })
  .refine(file => ALLOWED_FILE_EXTENSIONS.includes(file.type), {
    message: NOT_ALLOWED_FILE_TYPE,
  });
