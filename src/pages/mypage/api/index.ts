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
  return response;
};

export const setUserInfo = async (newUserInfo: UpdateUserInfoRequest) => {
  const response = await apiRequest<UpdateUserInfoData>({
    endPoint: '/users/me',
    method: 'PUT',
    data: { newUserInfo },
  });
  return response;
};
