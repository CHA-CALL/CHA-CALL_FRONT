import { ALLOWED_FILE_EXTENSIONS, MAX_MB } from '@shared/constant/image';

export const isAcceptableFile = (file: File) => {
  return file.type ? ALLOWED_FILE_EXTENSIONS.includes(file.type) : false;
};

export const isFileSizeValid = (file: File) => {
  return file.size <= MAX_MB * 1024 * 1024;
};
