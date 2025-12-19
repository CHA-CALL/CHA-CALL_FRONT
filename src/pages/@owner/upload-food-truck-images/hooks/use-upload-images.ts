import { useEffect, useState, type ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import { arrayMove } from '@dnd-kit/sortable';

import {
  useFoodTruckImage,
  useUploadImage,
  useDeleteImage,
} from '@pages/@owner/upload-food-truck-images/hooks/use-food-truck-image';

import type { DisplayImage } from '@pages/@owner/upload-food-truck-images/types/food-truck-image-display';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/schemas/food-truck-form.schema';
import { imageFileSchema } from '@pages/@owner/upload-food-truck-images/schemas/upload-food-truck-images.schema';

export const useUploadImages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { foodTruckId } = useParams<{ foodTruckId: string }>();

  const { setValue, getValues } = useFormContext<FoodTruckFormData>();

  const [initialImageUrls, setInitialImageUrls] = useState<string[]>([]);
  const [images, setImages] = useState<DisplayImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { mutateAsync: getPresignedUrl } = useFoodTruckImage();
  const { mutateAsync: uploadToS3 } = useUploadImage();
  const { mutateAsync: deleteFromS3 } = useDeleteImage();

  useEffect(() => {
    const existingUrls: string[] = getValues('photoUrls') || [];
    setInitialImageUrls(existingUrls);

    const displayImages = existingUrls.map(url => ({
      id: url,
      isNew: false,
      url: url,
    }));
    setImages(displayImages);
  }, [getValues]);

  useEffect(() => {
    const previews = images.map(image => {
      return image.isNew && image.file
        ? URL.createObjectURL(image.file)
        : image.url || '';
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

    const result = imageFileSchema.safeParse(selectedFile);

    if (!result.success) {
      setError(result.error.issues[0].message);
      e.target.value = '';
      return;
    }

    setError(null);

    setImages(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        isNew: true,
        file: selectedFile,
      },
    ]);
    e.target.value = '';
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
      const newFiles = images
        .filter(img => img.isNew && img.file)
        .map(img => img.file as File);
      const keptUrls = images
        .filter(img => !img.isNew && img.url)
        .map(img => img.url as string);
      const urlsToDelete = initialImageUrls.filter(
        url => !keptUrls.includes(url)
      );

      let newUploadedUrls: string[] = [];

      if (newFiles.length > 0) {
        const presignedData = await getPresignedUrl(newFiles);

        for (const data of presignedData) {
          await uploadToS3({
            presignedUrl: data.presignedUrl,
            file: data.file,
          });
        }

        newUploadedUrls = presignedData.map(data => data.fileUrl);
      }

      if (urlsToDelete.length > 0) {
        await deleteFromS3({ foodTruckId, imageUrls: urlsToDelete });
      }

      let newUrlIndex = 0;
      const finalOrderedUrls = images
        .map(img => {
          if (img.isNew) {
            return newUploadedUrls[newUrlIndex++];
          }
          return img.url;
        })
        .filter((url): url is string => !!url);

      setValue('photoUrls', finalOrderedUrls, { shouldValidate: true });

      navigate(ROUTES.FOOD_TRUCK_FORM(foodTruckId), {
        state: {
          formData: getValues(),
          from: 'upload-food-truck-images',
        },
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : '이미지 저장에 실패했습니다.'
      );
    }
  };

  const handleLeftClick = () => {
    if (!foodTruckId) return;
    navigate(ROUTES.FOOD_TRUCK_FORM(foodTruckId), {
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
