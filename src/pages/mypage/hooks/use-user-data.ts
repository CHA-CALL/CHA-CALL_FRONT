import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  GetUserInfoData,
  UpdateUserInfoRequest,
  UserResponse,
} from 'apis/data-contracts';
import { getUserInfo, updateUserInfo } from '@pages/mypage/api';
import { USER_INFO } from '@shared/querykey/user-info';
import useToast from '@shared/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';

export const DEFAULT_PROFILE_IMAGE =
  'https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg';

const userInfoQuery = {
  queryKey: USER_INFO.ALL,
  queryFn: getUserInfo,
  staleTime: Infinity,
  select: (response: GetUserInfoData) => {
    if (!response.data) {
      throw new Error('불러온 유저 정보가 없습니다.');
    }
    return response.data;
  },
}

export const useGetUserInfo = () => {
  return useQuery<GetUserInfoData, Error, UserResponse>(userInfoQuery);
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (newUserInfo: UpdateUserInfoRequest) =>
      updateUserInfo(newUserInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_INFO.ALL });
      toast.success('정보가 수정되었습니다.');
      navigate(ROUTES.PROFILE_SETTING);
    },
    onError: error => {
      toast.error(`정보 수정에 실패했습니다. ${error.message}`);
    },
  });
};
