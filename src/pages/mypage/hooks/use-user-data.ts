import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  GetUserInfoData,
  UpdateUserInfoRequest,
  UserResponse,
} from 'apis/data-contracts';
import { getUserInfo, updateUserInfo } from '@pages/mypage/api';
import { USER_INFO } from '@shared/querykey/user-info';

export const useGetUserInfo = () => {
  return useQuery<GetUserInfoData, Error, UserResponse>({
    queryKey: USER_INFO.ALL,
    queryFn: () => getUserInfo(),
    staleTime: Infinity,
    select: response => {
      if (!response.data) {
        throw new Error('불러온 유저 정보가 없습니다.');
      }
      return response.data;
    },
  });
};

interface useUpdateUserInfoOptions {
  onSuccess?: () => void;
  onError?: (_error: Error) => void;
}

export const useUpdateUserInfo = (options?: useUpdateUserInfoOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUserInfo: UpdateUserInfoRequest) =>
      updateUserInfo(newUserInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_INFO.ALL });
      options?.onSuccess?.();
    },
    onError: error => {
      console.error('유저 정보 갱신 실패:', error.message);
      options?.onError?.(error);
    },
  });
};
