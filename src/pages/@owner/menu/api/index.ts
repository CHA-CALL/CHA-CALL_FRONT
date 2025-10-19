import type {
  BaseResponseCursorPagingResponseMyFoodTruckMenuResponse,
  RegisterMenuRequest,
  UpdateMenuStatusRequest,
  UpdateMenuRequest,
  BaseResponseVoid,
  ImageInfo,
  BaseResponseImageResponse,
} from 'apis/data-contracts';
import { apiRequest } from '@api/apiRequest';
import { PAGE_SIZE } from '@shared/constant/page-size';

export const getFoodTruckMenus = async (params: {
  foodTruckId: number;
  sort?: '최신순' | '오래된순',
  'cursorPagingRequest.cursor'?: number;
}) => {
  const response = await apiRequest<BaseResponseCursorPagingResponseMyFoodTruckMenuResponse>({
    endPoint: `/owners/me/food-trucks/${params.foodTruckId}/menus`,
    method: 'GET',
    params: {
      ...params,
      'cursorPagingRequest.size': PAGE_SIZE,
    },
  });
  return response.data;
};

export const postFoodTruckMenu = async (params: {
  foodTruckId: number;
  data: RegisterMenuRequest;
}) => {
  const { foodTruckId, data } = params;
  const response = await apiRequest<BaseResponseVoid>({
    endPoint: `/owners/me/food-trucks/${foodTruckId}/menus`,
    method: 'POST',
    data,
  });
  return response.data;
};

export const editMenuStatus = async (params: {
  foodTruckId: number;
  menuId: number;
  data: UpdateMenuStatusRequest;
}) => {
  const { foodTruckId, menuId, data } = params;
  const response = await apiRequest<BaseResponseVoid>({
    endPoint: `/owners/me/food-trucks/${foodTruckId}/menus/${menuId}/change-status`,
    method: 'PATCH',
    data,
  });
  return response.data;
};

export const editFoodTruckMenu = async (params: {
  foodTruckId: number;
  menuId: number;
  data: UpdateMenuRequest;
}) => {
  const { foodTruckId, menuId, data } = params;
  const response = await apiRequest<BaseResponseVoid>({
    endPoint: `/owners/me/food-trucks/${foodTruckId}/menus/${menuId}`,
    method: 'PUT',
    data,
  });
  return response.data;
};

export const deleteFoodTruckMenu = async (params: {
  foodTruckId: number;
  menuId: number;
}) => {
  const { foodTruckId, menuId } = params;
  const response = await apiRequest<BaseResponseVoid>({
    endPoint: `/owners/me/food-trucks/${foodTruckId}/menus/${menuId}`,
    method: 'DELETE',
  });
  return response.data;
};

export const getPresignedUrl = async (fileExtension: string): Promise<ImageInfo> => {
  const response = await apiRequest<BaseResponseImageResponse>({
    endPoint: `/food-trucks/menus/images`,
    method: 'POST',
    data: {
      fileExtensions: [fileExtension],
    },
  });

  const imageInfo = response.data?.presignedUrls?.[0];

  if (!imageInfo) {
    throw new Error('Presigned URL을 받아오지 못했습니다.');
  }

  return imageInfo;
};

export const uploadImage = async (presignedUrl: string, file: File) => {
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
