import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  GetUserInfoData,
  UpdateUserInfoData,
  UpdateUserInfoRequest,
  UserResponse,
} from 'apis/data-contracts';
import { getUserInfo, setUserInfo } from '../api';

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

export const usePatchUserData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUserInfo: UpdateUserInfoRequest) =>
      setUserInfo(newUserInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
    onError: error => {
      console.error('유저 정보 갱신 실패:', error.message);
    },
  });
};
