import type {
  ImageInfo,
  BaseResponseImageResponse,
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
