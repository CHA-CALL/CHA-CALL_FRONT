import { useEffect, useState, type ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import { isAcceptableFile, isFileSizeValid } from '@shared/utils/image';
import {
  CANNOT_UPLOAD_FILE_MB,
  NOT_ALLOWED_FILE_TYPE,
} from '@shared/constant/image';
import { arrayMove } from '@dnd-kit/sortable';
import { useFoodTruckImage, useUploadImageToS3 } from '@pages/@owner/upload-food-truck-images/hooks/use-food-truck-image';
import { useFormContext } from 'react-hook-form';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/utils/use-food-truck-form';
import type { FoodTruckImageUrl } from '@pages/@owner/upload-food-truck-images/types/food-truck-image-url';

export const useUploadImage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setValue, getValues } = useFormContext<FoodTruckFormData>();

  const [images, setImages] = useState<FoodTruckImageUrl[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { mutateAsync: getPresignedUrl, isPending: isGettingUrl } = useFoodTruckImage();
  const { mutateAsync: uploadToS3, isPending: isUploading } = useUploadImageToS3();

  useEffect(() => {
    const urls = images.map(image => URL.createObjectURL(image.file));
    setImagePreviews(urls);

    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!isAcceptableFile(selectedFile) || !isFileSizeValid(selectedFile)) {
      setError(isAcceptableFile(selectedFile) ? CANNOT_UPLOAD_FILE_MB : NOT_ALLOWED_FILE_TYPE);
      return;
    }
    setError(null);

    try {
      const newPhotoData = await getPresignedUrl([selectedFile]);
      setImages(prev => [...prev, ...newPhotoData]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'URL 요청에 실패했습니다.');
    } finally {
      e.target.value = '';
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleReorderFiles = (oldIndex: number, newIndex: number) => {
    setImages(prev => arrayMove(prev, oldIndex, newIndex));
  };

  const handleSubmitImage = async () => {
    if (images.length === 0) {
      setError('최소 1개의 이미지를 업로드해야 합니다.');
      return;
    }

    try {
      const uploadPromises = images.map(image =>
        uploadToS3({ presignedUrl: image.presignedUrl, file: image.file })
      );
      await Promise.all(uploadPromises);

      const finalFileUrls = images.map(image => image.fileUrl);
      setValue('photoUrls', finalFileUrls, { shouldValidate: true });

      navigate(ROUTES.FOOD_TRUCK_FORM, {
        state: {
          formData: getValues(),
          from: 'upload-food-truck-images',
        },
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.');
    }
  };

  const handleLeftClick = () => {
    navigate(ROUTES.FOOD_TRUCK_FORM, {
      state: { formData: getValues(), from: location.pathname },
    });
  };

  const isProcessing = isGettingUrl || isUploading;

  return {
    images,
    imagePreviews,
    error,
    isProcessing,
    handleLeftClick,
    handleFileChange,
    handleRemoveFile,
    handleReorderFiles,
    handleSubmitImage,
  };
};
