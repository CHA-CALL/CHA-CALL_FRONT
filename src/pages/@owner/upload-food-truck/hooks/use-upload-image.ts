import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import { isAcceptableFile, isFileSizeValid } from '@shared/utils/image';
import {
  CANNOT_UPLOAD_FILE_MB,
  NOT_ALLOWED_FILE_TYPE,
} from '@shared/constant/image';
import { arrayMove } from '@dnd-kit/sortable';
import { useFoodTruckImage } from '@pages/@owner/upload-food-truck/hooks/use-food-truck-image';

export const useUploadImage = () => {
  const navigate = useNavigate();

  const { mutateAsync } = useFoodTruckImage();

  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleLeftClick = () => {
    navigate(ROUTES.UPLOAD_FOOD_TRUCK);
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

    setFiles([...files, selectedFile]);
    setError(null);
    e.target.value = '';
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  };

  const handleReorderFiles = (oldIndex: number, newIndex: number) => {
    setFiles(prevFiles => arrayMove(prevFiles, oldIndex, newIndex));
  };

  const handleSubmitImage = async () => {
    if (files.length === 0) {
      setError('최소 1개의 이미지를 업로드해야 합니다.');
      return;
    }

    try {
      await mutateAsync(files);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return {
    files,
    error,
    handleLeftClick,
    handleFileChange,
    handleRemoveFile,
    handleReorderFiles,
    handleSubmitImage,
  };
};
