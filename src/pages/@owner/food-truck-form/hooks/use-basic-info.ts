import { type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/utils/use-food-truck-form';
import { isAcceptableFile, isFileSizeValid } from '@utils/image';
import { CANNOT_UPLOAD_FILE_MB, NOT_ALLOWED_FILE_TYPE } from '@constant/image';
import { ROUTES } from '@router/constant/routes';
import { formatPhoneNumber } from '@utils/phone-number';
import { FOOD_TRUCK_ERROR_MESSAGE } from '@pages/@owner/food-truck-form/constants/food-truck';

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
  // 중복체크 버튼을 누를 수 있는 상태: 이름이 있고, 중복체크가 완료되지 않은 경우
  const canCheckNameDuplicate =
    formData.name.trim() !== '' && !formData.nameDuplicate;

  const updateName = (name: string) => {
    setValue('name', name, { shouldValidate: true });
    setValue('nameDuplicate', false, { shouldValidate: true });
  };

  const updateDescription = (description: string) => {
    setValue('description', description, { shouldValidate: true });
  };

  const checkNameDuplicated = () => {
    //TODO: 추후 중복확인 로직 추가
    const isDuplicateSuccess = Math.random() > 0.5;

    if (isDuplicateSuccess) {
      setValue('nameDuplicate', true, { shouldValidate: true });
    } else {
      setValue('nameDuplicate', false, { shouldValidate: true });
      setError('name', {
        message: FOOD_TRUCK_ERROR_MESSAGE.nameDuplicate.duplicated,
      });
    }
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
    nameDuplicate: formData.nameDuplicate,
    canCheckNameDuplicate,
    // Errors
    nameError: errors.name?.message,
    descriptionError: errors.description?.message,
    phoneNumberError: errors.phoneNumber?.message,
    operatingInfoError: errors.operatingInfo?.message,
    optionError: errors.option?.message,
    photoUrlsError: errors.photoUrls?.message,
    // Actions
    updateName,
    updateDescription,
    updatePhoneNumber,
    updateOperatingInfo,
    updateOption,
    checkNameDuplicated,
    // Photo actions
    handleFileChange,
    handleRemoveFile,
    handleSubmit,
  };
};
