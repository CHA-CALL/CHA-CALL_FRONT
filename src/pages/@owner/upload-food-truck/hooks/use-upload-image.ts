import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import { useQueryClient } from '@tanstack/react-query';
import { FOOD_TRUCK_IMAGE_QUERY_KEY } from '@shared/querykey/food-trucks/food-truck-image';
import { isAcceptableFile, isFileSizeValid } from '@shared/utils/image';
import {
  CANNOT_UPLOAD_FILE_MB,
  NOT_ALLOWED_FILE_TYPE,
} from '@shared/constant/image';
import { arrayMove } from '@dnd-kit/sortable';
import { getPresignedUrl } from '@pages/@owner/upload-food-truck/api';

export interface ImageData {
  presignedUrl: string;
  file: File;
}

export const useUploadImage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
      setError('이미지를 1장 이상 등록해주세요.');
      return;
    }

    try {
      const fileExtensions = files.map(file => file.name.split('.').pop() || '');
      const imageInfos = await getPresignedUrl(fileExtensions);

      if (imageInfos.length !== files.length) {
        throw new Error('URL 요청 수와 파일 수가 일치하지 않습니다.');
      }

      const imagesData: ImageData[] = imageInfos.map((info, index) => {
        if (!info.presignedUrl || !info.fileUrl) {
          throw new Error(`"${files[index].name}" 파일의 URL 정보를 받지 못했습니다.`);
        }
        return {
          presignedUrl: info.presignedUrl,
          file: files[index],
        };
      });

      queryClient.setQueryData(
        FOOD_TRUCK_IMAGE_QUERY_KEY.IMAGES(),
        imagesData
      );

      navigate(ROUTES.UPLOAD_FOOD_TRUCK);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : '오류가 발생했습니다.');
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
