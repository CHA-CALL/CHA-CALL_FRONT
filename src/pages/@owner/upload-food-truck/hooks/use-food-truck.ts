import { useState, type ChangeEvent } from 'react';
import {
  isAcceptableFile,
  isFileSizeValid,
  isImageSizeValid,
} from '@shared/utils/image';
import {
  CANNOT_UPLOAD_FILE_MB,
  NOT_ALLOWED_FILE_TYPE,
  IMAGE_SIZE_MESSAGE,
} from '@shared/constant/image';

export const MAX_IMAGE_COUNT = 9;

export const useFoodTruck = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitImage = () => {
    //TODO: 이미지 제출 로직
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile || !isAcceptableFile(selectedFile)) {
      setError(NOT_ALLOWED_FILE_TYPE);
      return;
    }
    if (!isFileSizeValid(selectedFile)) {
      setError(CANNOT_UPLOAD_FILE_MB);
      return;
    }
    if (!isImageSizeValid(selectedFile)) {
      setError(IMAGE_SIZE_MESSAGE);
      return;
    }

    setFiles([...files, selectedFile]);
    setError(null);
    e.target.value = '';
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  };

  return {
    files,
    setFiles,
    handleFileChange,
    handleRemoveFile,
    handleSubmitImage,
    error,
  };
};
