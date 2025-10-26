import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { FOOD_TRUCK_IMAGE_QUERY_KEY } from '@shared/querykey/food-trucks/food-truck-image';
import { getPresignedUrl } from '@pages/@owner/upload-food-truck/api';

export interface ImageData {
  presignedUrl: string;
  file: File;
}

export const useFoodTruckImage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<ImageData[], Error, File[]>({
    mutationKey: FOOD_TRUCK_IMAGE_QUERY_KEY.IMAGES(),
    mutationFn: async(files: File[]) => {
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

      return imagesData;
    },
    onSuccess: (imagesData) => {
      queryClient.setQueryData(
        FOOD_TRUCK_IMAGE_QUERY_KEY.IMAGES(),
        imagesData
      );
      navigate(ROUTES.UPLOAD_FOOD_TRUCK);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
