import type {
  ImageInfo,
  BaseResponseImageResponse,
  DeleteFoodTruckImagesRequest,
} from 'apis/data-contracts';
import { apiRequest } from '@api/apiRequest';

export const getPresignedUrl = async (fileExtensions: string[]): Promise<ImageInfo[]> => {
  const response = await apiRequest<BaseResponseImageResponse>({
    endPoint: `/food-trucks/images`,
    method: 'POST',
    data: {
      fileExtensions,
    },
  });

  const imageInfos = response.data?.presignedUrls;

  if (!imageInfos || imageInfos.length === 0) {
    throw new Error('Presigned URL을 받아오지 못했습니다.');
  }

  return imageInfos;
};

export const uploadImage = async (presignedUrl: string, file: File) => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error('이미지 업로드를 실패했습니다.');
  }

  return response;
};

export const deleteFoodTruckImages = async (
  foodTruckId: string,
  data: DeleteFoodTruckImagesRequest
) => {
  const response = await apiRequest({
    endPoint: `/food-trucks/${foodTruckId}/images`,
    method: 'DELETE',
    data,
  });
  return response;
};
