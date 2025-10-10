import { apiRequest } from '@api/apiRequest';
import type {
  GetUserInfoData,
  UpdateUserInfoData,
  UpdateUserInfoRequest,
} from 'apis/data-contracts';

export const getUserInfo = async () => {
  const response = await apiRequest<GetUserInfoData>({
    endPoint: '/users/me',
    method: 'GET',
  });
  if (!response.isSuccess || !response.data) {
    throw new Error(response.message || '유저 정보를 가져오는데 실패했습니다.');
  }
  return response;
};

export const setUserInfo = async (newUserInfo: UpdateUserInfoRequest) => {
  const response = await apiRequest<UpdateUserInfoData>({
    endPoint: '/users/me',
    method: 'PUT',
    data: { newUserInfo },
  });
  if (!response.isSuccess || !response.data) {
    throw new Error(
      response.message || '유저 정보를 수정하는 것에 실패했습니다.'
    );
  }
  return response;
};
