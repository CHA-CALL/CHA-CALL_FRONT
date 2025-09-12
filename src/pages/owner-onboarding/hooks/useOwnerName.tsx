import {
  OWNER_TEXT,
  OWNER_TEXT_ERROR_MESSAGE,
} from '@pages/owner-onboarding/constants/owner';
import { z } from 'zod';
import { useState } from 'react';

export const OWNER_NAME_VALIDATOR = z
  .string()
  .min(
    OWNER_TEXT.MIN_LENGTH,
    OWNER_TEXT_ERROR_MESSAGE.MIN(OWNER_TEXT.MIN_LENGTH)
  )
  .max(
    OWNER_TEXT.MAX_LENGTH,
    OWNER_TEXT_ERROR_MESSAGE.MAX(OWNER_TEXT.MAX_LENGTH)
  );

export const useOwnerName = () => {
  const [isNameVerified, setIsNameVerified] = useState(false);
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);

  const handleCheckNameDuplicate = (_name: string) => {
    //TODO: 중복확인 로직 추가
    setIsNameVerified(true);
    handleIsCheckingDuplicate();
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
    isCheckingDuplicate,
    handleCheckNameDuplicate,
    resetVerification,
  };
};
