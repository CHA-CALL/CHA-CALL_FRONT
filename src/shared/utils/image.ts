import {
  ALLOWED_FILE_EXTENSIONS,
  MAX_MB,
  IMAGE_SIZE_RATIO,
} from '@shared/constant/image';

export const isAcceptableFile = (file: File) => {
  return file.type ? ALLOWED_FILE_EXTENSIONS.includes(file.type) : false;
};

export const isFileSizeValid = (file: File) => {
  return file.size <= MAX_MB * 1024 * 1024;
};

export const isImageSizeValid = (file: File) => {
  const img = new Image();
  const url = URL.createObjectURL(file);

  img.onload = () => {
    URL.revokeObjectURL(url);
    return img.width >= IMAGE_SIZE_RATIO && img.height >= IMAGE_SIZE_RATIO;
  };

  img.onerror = () => {
    URL.revokeObjectURL(url);
    return false;
  };
  return false;
};
