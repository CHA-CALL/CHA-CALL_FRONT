import { useMutation } from '@tanstack/react-query';
import {
  getPresignedUrl,
  uploadImage,
  deleteFoodTruckImages,
} from '@pages/@owner/upload-food-truck-images/api';
import type { FoodTruckImageUrl } from '@pages/@owner/upload-food-truck-images/types/food-truck-image-url';
import { FOOD_TRUCKS_QUERY_KEY } from '@shared/querykey/food-trucks';

export const useFoodTruckImage = () => {
  return useMutation<FoodTruckImageUrl[], Error, File[]>({
    mutationKey: FOOD_TRUCKS_QUERY_KEY.LIST(),
    mutationFn: async (files: File[]) => {
      const allImageInfos: FoodTruckImageUrl[] = [];

      for (const file of files) {
        const ext = file.name.split('.').pop() || '';
        const imageInfos = await getPresignedUrl([ext]);

        if (imageInfos.length !== 1) {
          throw new Error(`"${file.name}" 파일의 URL 요청 실패`);
        }

        const info = imageInfos[0];
        if (!info.presignedUrl || !info.fileUrl) {
          throw new Error(`"${file.name}" 파일의 URL 정보를 받지 못했습니다.`);
        }

        allImageInfos.push({
          file: file,
          presignedUrl: info.presignedUrl,
          fileUrl: info.fileUrl,
        });
      }

      return allImageInfos;
    },
  });
};

export const useUploadImage = () => {
  return useMutation<void, Error, { presignedUrl: string; file: File }>({
    mutationFn: async ({ presignedUrl, file }) => {
      await uploadImage(presignedUrl, file);
    },
  });
};

export const useDeleteImage = () => {
  return useMutation<void, Error, { foodTruckId: string; imageUrls: string[] }>(
    {
      mutationFn: async ({ foodTruckId, imageUrls }) => {
        await deleteFoodTruckImages(foodTruckId, { imageUrls });
      },
    }
  );
};
