import { z } from 'zod';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useToast from '@shared/hooks/use-toast';
import type { FoodTruckNameDuplicateCheckResponse } from 'apis/data-contracts';
import { checkNameDuplicate } from '@pages/@owner/food-truck-onboarding/api';
import {
  OWNER_TEXT,
  OWNER_TEXT_ERROR_MESSAGE,
} from '@pages/@owner/food-truck-onboarding/constants/owner';

export const FOOD_TRUCK_NAME_VALIDATOR = z
  .string()
  .trim()
  .min(
    OWNER_TEXT.MIN_LENGTH,
    OWNER_TEXT_ERROR_MESSAGE.MIN(OWNER_TEXT.MIN_LENGTH)
  )
  .max(
    OWNER_TEXT.MAX_LENGTH,
    OWNER_TEXT_ERROR_MESSAGE.MAX(OWNER_TEXT.MAX_LENGTH)
  );

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
