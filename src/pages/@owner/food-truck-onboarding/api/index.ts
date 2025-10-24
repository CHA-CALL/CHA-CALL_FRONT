import { apiRequest } from '@api/apiRequest';
import type {
  BaseResponseVoid,
  BaseResponseFoodTruckNameDuplicateCheckResponse,
  ImageInfo,
  BaseResponseImageResponse,
} from 'apis/data-contracts';

export const createNewFoodTruck = async (params: {
  name: string,
  businessRegistrationUrl: string,
  otherDocumentUrls?: string[];
}) => {
  const response = await apiRequest<BaseResponseVoid>({
    endPoint: `/owners`,
    method: 'POST',
    data: params,
  });
  return response.data;
};

export const checkNameDuplicate = async (name: string) => {
  const response = await apiRequest<BaseResponseFoodTruckNameDuplicateCheckResponse>({
    endPoint: `/food-trucks/duplicate-check`,
    method: 'POST',
    data: { name },
  });
  return response.data;
};

export const getPresignedUrls = async (fileExtensions: string[]): Promise<ImageInfo[]> => {
  const response = await apiRequest<BaseResponseImageResponse>({
    // TODO: 엔드 포인트 수정
    endPoint: `/food-trucks/images`,
    method: 'POST',
    data: { fileExtensions },
  });

  const imageInfos = response.data?.presignedUrls;

  if (!imageInfos) {
    throw new Error('Presigned URL을 받아오지 못했습니다.');
  }

  return imageInfos;
};

export const uploadImage = async (presignedUrl: string, file: File) => {
  // TODO: 삭제 및 presignedUrl로 수정 (서류 이미지 업로드 테스트용)
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
