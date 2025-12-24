import { zodResolver } from '@hookform/resolvers/zod';
import {
  DEFAULT_PROFILE_IMAGE,
  useGetUserInfo,
  useUpdateUserInfo,
} from '@pages/mypage/hooks/use-user-data';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  userSchema,
  type UserFormData,
} from '@pages/set-user-info/schema/user-info.schema';

export const useSetUserInfo = () => {
  const { data: userData, isPending: isInitialLoading } = useGetUserInfo();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUserInfo();
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
    isInitialLoading,
    isUpdating,
    isValid: formMethods.formState.isValid,
    userData,
  };
};
