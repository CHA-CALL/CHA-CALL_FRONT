import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useToast from '@shared/hooks/use-toast';
import type { FoodTruckNameDuplicateCheckResponse } from 'apis/data-contracts';
import { checkNameDuplicate } from '@pages/@owner/food-truck-onboarding/api';

export const useFoodTruckName = () => {
  const toast = useToast();

  const [isNameVerified, setIsNameVerified] = useState(false);

  const useCheckName = useMutation<
    FoodTruckNameDuplicateCheckResponse | undefined,
    Error,
    string
  >({
    mutationFn: (name: string) => checkNameDuplicate(name),
    onSuccess: (data) => {
      if (!data?.duplicated) {
        setIsNameVerified(true);
        toast.success('사용할 수 있는 이름입니다.');
      }
    },
    onError: (error) => {
      console.error('중복 확인 실패:', error);
      toast.error('이름 중복 확인에 실패했습니다. 다시 시도해주세요.');
      setIsNameVerified(false);
    },
  });

  const handleCheckName = async (name: string) => {
    return useCheckName.mutateAsync(name);
  }

  const resetVerification = () => {
    setIsNameVerified(false);
  };

  return {
    isNameVerified,
    handleCheckName,
    resetVerification,
  };
};
