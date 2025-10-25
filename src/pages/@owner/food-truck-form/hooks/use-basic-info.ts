import { type ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form';
import { isAcceptableFile, isFileSizeValid } from '@shared/utils/image';
import {
  CANNOT_UPLOAD_FILE_MB,
  NOT_ALLOWED_FILE_TYPE,
} from '@shared/constant/image';
import { ROUTES } from '@router/constant/routes';
import { formatPhoneNumber } from '@shared/utils/phone-number';
import { FOOD_TRUCK_ERROR_MESSAGE } from '../constants/food-truck';

//푸드트럭 이름, 한줄소개, 전화번호, 푸드트럭 사진, 운영정보, 기타 필드
export const useBasicInfo = () => {
  const navigate = useNavigate();
  const {
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useFormContext<FoodTruckFormData>();

  const formData = watch();
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);
  const [nameDuplicateMessage, setNameDuplicateMessage] = useState<
    string | undefined
  >(undefined);

  const handleCheckNameDuplicate = () => {
    // TODO: 이름 중복 체크 로직 추가
    setNameDuplicateMessage(FOOD_TRUCK_ERROR_MESSAGE.nameDuplicate.success);
    setIsCheckingDuplicate(true);
  };

  const updateName = (name: string) => {
    setValue('name', name, { shouldValidate: true });
    setIsCheckingDuplicate(false);
    setNameDuplicateMessage(undefined);
  };

  const updateDescription = (description: string) => {
    setValue('description', description, { shouldValidate: true });
  };

  const updatePhoneNumber = (phoneNumber: string) => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    if (formattedPhoneNumber.length === 0) {
      setValue('phoneNumber', '', { shouldValidate: true });
      return;
    }
    setValue('phoneNumber', formattedPhoneNumber, { shouldValidate: true });
  };

  const updateOperatingInfo = (operatingInfo: string) => {
    setValue('operatingInfo', operatingInfo, {
      shouldValidate: true,
    });
  };

  const updateOption = (option: string) => {
    setValue('option', option, { shouldValidate: true });
  };

  const handleClickRouteToUploadFoodTruckImages = () => {
    const currentFormData = watch();
    navigate(ROUTES.UPLOAD_FOOD_TRUCK_IMAGES, {
      state: {
        formData: currentFormData,
      },
    });
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    if (!isAcceptableFile(selectedFile)) {
      setError('photoUrls', {
        message: NOT_ALLOWED_FILE_TYPE,
      });
      return;
    }
    if (!isFileSizeValid(selectedFile)) {
      setError('photoUrls', {
        message: CANNOT_UPLOAD_FILE_MB,
      });
      return;
    }

    const currentFiles = formData.photoUrls || [];
    setValue('photoUrls', [...currentFiles, selectedFile], {
      shouldValidate: true,
    });
    e.target.value = '';
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const currentFiles = formData.photoUrls || [];
    const updatedFiles = currentFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setValue('photoUrls', updatedFiles, { shouldValidate: true });
  };

  const handleSubmit = () => {
    const currentFormData = watch();
    navigate(ROUTES.FOOD_TRUCK_FORM, {
      state: {
        formData: currentFormData,
        from: 'food-truck-form',
      },
    });
  };

  return {
    // Data
    name: formData.name,
    description: formData.description,
    phoneNumber: formData.phoneNumber,
    photoUrls: formData.photoUrls,
    operatingInfo: formData.operatingInfo,
    option: formData.option,
    isCheckingDuplicate: isCheckingDuplicate,

    // Errors
    nameError: errors.name?.message,
    descriptionError: errors.description?.message,
    phoneNumberError: errors.phoneNumber?.message,
    photoUrlsError: errors.photoUrls?.message,
    operatingInfoError: errors.operatingInfo?.message,
    optionError: errors.option?.message,
    nameDuplicateMessage: nameDuplicateMessage,

    // Actions
    updateName,
    updateDescription,
    updatePhoneNumber,
    updateOperatingInfo,
    updateOption,
    handleCheckNameDuplicate,

    // Photo actions
    handleFileChange,
    handleClickRouteToUploadFoodTruckImages,
    handleRemoveFile,
    handleSubmit,
  };
};
