import { zodResolver } from '@hookform/resolvers/zod';
import {
  DEFAULT_PROFILE_IMAGE,
  useGetUserInfo,
  useUpdateUserInfo,
} from '@pages/mypage/hooks/use-user-data';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { USER_NAME_MAX_LENGTH } from '@pages/set-user-info/constant/set-user-constant';

const userSchema = z.object({
  profileImageUrl: z.string().url().optional(),
  name: z
    .string()
    .min(1, '이름은 필수입니다.')
    .max(USER_NAME_MAX_LENGTH, '이름은 최대 25자까지 가능합니다.'),
  email: z
    .string()
    .min(1, '이메일은 필수입니다.')
    .email('이메일 형식이 올바르지 않습니다.'),
  gender: z.string().min(1, '성별은 필수입니다.'),
  termAgreed: z.boolean(),
});

type UserFormData = z.infer<typeof userSchema>;

export const useSetUserInfo = () => {
  const { data: userData, isLoading } = useGetUserInfo();
  const { mutate: updateUser, isPending } = useUpdateUserInfo();
  const formMethods = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
  });
  const { reset } = formMethods;
  useEffect(() => {
    if (userData) {
      const formValues: UserFormData = {
        name: userData.name ?? '',
        email: userData.email ?? '',
        gender: userData.gender ?? '남성',
        termAgreed: userData.termAgreed ?? false,
        profileImageUrl: userData.profileImageUrl ?? DEFAULT_PROFILE_IMAGE,
      };

      reset(formValues);
    }
  }, [userData, reset]);

  const onSubmit = (data: UserFormData) => {
    const payload = {
      ...data,
      profileImageUrl: data.profileImageUrl ?? DEFAULT_PROFILE_IMAGE,
    };
    updateUser(payload);
  };

  return {
    formMethods,
    handleSubmit: formMethods.handleSubmit(onSubmit),
    isFetching: isLoading || isPending,
    isValid: formMethods.formState.isValid,
    userData,
  };
};
