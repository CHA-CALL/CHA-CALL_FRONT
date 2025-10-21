import { useState, type ChangeEvent } from 'react';
import { isAcceptableFile, isFileSizeValid } from '@shared/utils/image';
import {
  CANNOT_UPLOAD_FILE_MB,
  NOT_ALLOWED_FILE_TYPE,
} from '@shared/constant/image';
import { arrayMove } from '@dnd-kit/sortable';
import { getPresignedUrl, uploadFoodTruckImage } from '@pages/@owner/upload-food-truck/api';

export const CANNOT_UPLOAD_FILE = '파일 업로드 실패';
export const useFoodTruck = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

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
      const fileExtensions = files.map(
        file => file.name.split('.').pop() || ''
      );

      const imageInfos = await getPresignedUrl(fileExtensions);

      if (imageInfos.length !== files.length) {
        throw new Error('URL 요청 수와 파일 수가 일치하지 않습니다.');
      }

      const uploadPromises = imageInfos.map((info, index) => {
        if (!info.presignedUrl) {
          throw new Error(
            `"${files[index].name}" 파일의 업로드 URL을 받지 못했습니다.`
          );
        }
        return uploadFoodTruckImage(info.presignedUrl, files[index]);
      });

      await Promise.all(uploadPromises);

      const finalImageUrls = imageInfos.map(info => info.fileUrl);

      // TODO: finalImageUrls을 서버에 전송하는 API를 호출
      // 성공 시 페이지 이동
      console.info('서버에 저장할 URL:', finalImageUrls);

    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.');
    }
  };

  return {
    files,
    error,
    handleFileChange,
    handleRemoveFile,
    handleReorderFiles,
    handleSubmitImage,
  };
};
