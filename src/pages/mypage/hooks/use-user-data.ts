import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  GetUserInfoData,
  UpdateUserInfoRequest,
  UserResponse,
} from 'apis/data-contracts';
import { getUserInfo, updateUserInfo } from '@pages/mypage/api';
import { USER_INFO } from '@shared/querykey/user-info';

export const DEFAULT_PROFILE_IMAGE =
  'https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg';

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

export const useUpdateUserInfo2 = (options?: useUpdateUserInfoOptions) => {
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

export const useUpdateUserInfo = (options?: useUpdateUserInfoOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (changedUserInfo: Partial<UpdateUserInfoRequest>) => {
      const previousUserData = queryClient.getQueryData<GetUserInfoData>(
        USER_INFO.ALL
      );

      const cachedUserData = previousUserData?.data;

      if (
        !cachedUserData ||
        !cachedUserData.profileImageUrl ||
        !cachedUserData.name ||
        !cachedUserData.email ||
        !cachedUserData.gender ||
        typeof cachedUserData.termAgreed !== 'boolean'
      ) {
        throw new Error('캐시에 기존의 유저 데이터가 없습니다.');
      }
      const newUserInfo: UpdateUserInfoRequest = {
        profileImageUrl:
          cachedUserData.profileImageUrl || DEFAULT_PROFILE_IMAGE,
        name: cachedUserData.name,
        email: cachedUserData.email,
        gender: cachedUserData.gender,
        termAgreed: cachedUserData.termAgreed,
        ...changedUserInfo,
      };

      return updateUserInfo(newUserInfo);
    },
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
