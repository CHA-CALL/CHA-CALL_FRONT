import { useQuery } from '@tanstack/react-query';
import type { GetUserInfoData, UserResponse } from 'apis/data-contracts';
import { getUserInfo } from '../api';

export const useFetchUserData = () => {
  return useQuery<GetUserInfoData, Error, UserResponse>({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(),
    select: response => {
      if (!response.data) {
        throw new Error('불러온 유저 정보가 없습니다.');
      }
      return response.data;
    },
  });
};
