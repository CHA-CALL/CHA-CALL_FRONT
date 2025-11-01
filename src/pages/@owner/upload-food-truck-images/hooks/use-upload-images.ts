import { useEffect, useState, type ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import { arrayMove } from '@dnd-kit/sortable';

import { isAcceptableFile, isFileSizeValid } from '@shared/utils/image';
import {
  CANNOT_UPLOAD_FILE_MB,
  NOT_ALLOWED_FILE_TYPE,
} from '@shared/constant/image';

import {
  useFoodTruckImage,
  useUploadImageToS3,
  useDeleteFoodTruckImages,
} from '@pages/@owner/upload-food-truck-images/hooks/use-food-truck-image';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/utils/use-food-truck-form';
import type { FoodTruckImageUrl } from '@pages/@owner/upload-food-truck-images/types/food-truck-image-url';

export const useUploadImage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: foodTruckId } = useParams<{ id: string }>();

  const { setValue, getValues } = useFormContext<FoodTruckFormData>();

  const [initialImageUrls, setInitialImageUrls] = useState<string[]>([]);
  const [images, setImages] = useState<(FoodTruckImageUrl & { isNew?: boolean })[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { mutateAsync: getPresignedUrl } = useFoodTruckImage();
  const { mutateAsync: uploadToS3 } = useUploadImageToS3();
  const { mutateAsync: deleteFromS3 } = useDeleteFoodTruckImages();

  useEffect(() => {
    const existingUrls: string[] = getValues('photoUrls') || [];
    setInitialImageUrls(existingUrls);

    const existingImages = existingUrls.map(url => ({
      file: new File([], ''),
      presignedUrl: url,
      fileUrl: url,
      isNew: false
    }));
    setImages(existingImages);
  }, [getValues]);

  useEffect(() => {
    const previews = images.map((image) => {
      return image.isNew ? URL.createObjectURL(image.file) : image.fileUrl;
    });
    setImagePreviews(previews);

    return () => {
      previews.forEach((url, index) => {
        if (images[index]?.isNew) {
          URL.revokeObjectURL(url);
        }
      });
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
      const newImageData = await getPresignedUrl([selectedFile]);
      setImages(prev => [...prev, ...newImageData]);
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
    if (!foodTruckId) {
        setError('푸드트럭 ID가 없어 저장할 수 없습니다.');
        return;
    }

    if (images.length === 0) {
      setError('최소 1개의 이미지를 업로드해야 합니다.');
      return;
    }

    try {
      const currentUrls = images.map(p => p.fileUrl);
      const newImages = images.filter(p => p.isNew);

      const urlsToDelete = initialImageUrls.filter(initialUrl => !currentUrls.includes(initialUrl));

      if (urlsToDelete.length > 0) {
        await deleteFromS3({ foodTruckId, imageUrls: urlsToDelete });
      }

      if (newImages.length > 0) {
        const uploadPromises = newImages.map(image =>
          uploadToS3({ presignedUrl: image.presignedUrl, file: image.file })
        );
        await Promise.all(uploadPromises);
      }

      setValue('photoUrls', currentUrls, { shouldValidate: true });

      navigate(`${ROUTES.FOOD_TRUCK_FORM}/${foodTruckId.toString()}`, {
        state: {
          formData: getValues(),
          from: 'upload-food-truck-images',
        },
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : '이미지 저장에 실패했습니다.');
    }
  };

  const handleLeftClick = () => {
    navigate(`${ROUTES.FOOD_TRUCK_FORM}/${foodTruckId?.toString()}`, {
      state: { formData: getValues(), from: location.pathname },
    });
  };

  return {
    images,
    imagePreviews,
    error,
    handleLeftClick,
    handleFileChange,
    handleRemoveFile,
    handleReorderFiles,
    handleSubmitImage,
  };
};
