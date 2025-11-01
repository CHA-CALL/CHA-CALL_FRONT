import { useMutation } from '@tanstack/react-query';
import { FOOD_TRUCK_IMAGE_QUERY_KEY } from '@shared/querykey/food-trucks/food-truck-image';
import { getPresignedUrl, uploadImage } from '@pages/@owner/upload-food-truck-images/api';
import type { FoodTruckImageUrl } from '@pages/@owner/upload-food-truck-images/types/food-truck-image-url';

export const useFoodTruckImage = () => {
  return useMutation<FoodTruckImageUrl[], Error, File[]>({
    mutationKey: FOOD_TRUCK_IMAGE_QUERY_KEY.IMAGES(),
    mutationFn: async (files: File[]) => {
      const fileExtensions = files.map(file => file.name.split('.').pop() || '');
      const imageInfos = await getPresignedUrl(fileExtensions);

      if (imageInfos.length !== files.length) {
        throw new Error('URL 요청 수와 파일 수가 일치하지 않습니다.');
      }

      return imageInfos.map((info, index) => {
        if (!info.presignedUrl || !info.fileUrl) {
          throw new Error(`"${files[index].name}" 파일의 URL 정보를 받지 못했습니다.`);
        }
        return {
          file: files[index],
          presignedUrl: info.presignedUrl,
          fileUrl: info.fileUrl,
        };
      });
    },
  });
};

export const useUploadImageToS3 = () => {
  return useMutation<void, Error, { presignedUrl: string; file: File }>({
    mutationFn: ({ presignedUrl, file }) => uploadImage(presignedUrl, file),
  });
};
