import {
  OWNER_TEXT,
  OWNER_TEXT_ERROR_MESSAGE,
} from '@pages/@owner/food-truck-onboarding/constants/owner';
import { z } from 'zod';
import { useState } from 'react';
import { checkDuplicateName } from '@pages/@owner/food-truck-onboarding/api';
import useToast from '@shared/hooks/use-toast';

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
  const [isNameDuplicate, setIsNameDuplicate] = useState(false);
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);

  const handleCheckNameDuplicate = async (_name: string) => {
    handleIsCheckingDuplicate();

    try {
      const response = await checkDuplicateName(_name);
      const isAvailable = !response?.duplicated;

      if (isAvailable) {
        setIsNameVerified(isAvailable);
        toast.success('사용할 수 있는 이름입니다.');
      }

      return isAvailable;
    } catch (error) {
      console.error('중복 확인 실패:', error);
      setIsNameDuplicate(true);
      return false;
    }
  };

  const resetVerification = () => {
    setIsNameVerified(false);
    setIsCheckingDuplicate(false);
  };

  const handleIsCheckingDuplicate = () => {
    setIsCheckingDuplicate(true);
  };

  return {
    isNameVerified,
    isNameDuplicate,
    isCheckingDuplicate,
    handleCheckNameDuplicate,
    resetVerification,
  };
};
