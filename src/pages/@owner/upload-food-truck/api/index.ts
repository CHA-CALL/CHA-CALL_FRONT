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

export const uploadFoodTruckImage = async (presignedUrl: string, file: File) => {
  // TODO: 삭제 및 presignedUrl로 수정 (이미지 업로드 테스트용)
  const url = new URL(presignedUrl);
  const proxiedUrl = `/s3-proxy${url.pathname}${url.search}`;

  const response = await fetch(proxiedUrl, {
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