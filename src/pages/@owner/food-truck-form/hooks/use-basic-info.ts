import { type ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/schemas/food-truck-form.schema';
import { isAcceptableFile, isFileSizeValid } from '@utils/image';
import { CANNOT_UPLOAD_FILE_MB, NOT_ALLOWED_FILE_TYPE } from '@constant/image';
import { formatPhoneNumber } from '@utils/phone-number';
import { FOOD_TRUCK_ERROR_MESSAGE } from '@pages/@owner/food-truck-form/constants/food-truck';
import { useFoodTruckImage } from '@pages/@owner/upload-food-truck-images/hooks/use-food-truck-image';
import { useFoodTruckName } from '@pages/@owner/food-truck-onboarding/hooks/use-food-truck-name';

//푸드트럭 이름, 한줄소개, 전화번호, 푸드트럭 사진, 운영정보, 기타 필드
export const useBasicInfo = (previousName?: string) => {
  const {
    setValue,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext<FoodTruckFormData>();

  const { handleCheckName } = useFoodTruckName();

  const formData = watch();
  const name = watch('name') ?? '';
  const isChecked = watch('isNameChecked');
  // 중복체크 버튼을 누를 수 있는 상태: 이름이 있고, 중복체크가 완료되지 않은 경우
  const canCheckNameDuplicate =
    name.trim() !== '' && name !== previousName && !isChecked;

  const updateName = (name: string) => {
    setValue('name', name, { shouldValidate: true });
    if (previousName && name === previousName) {
      setValue('isNameChecked', true, { shouldValidate: true });
      setValue('isNameDuplicated', false, { shouldValidate: true });
    } else {
      setValue('isNameChecked', false, { shouldValidate: true });
      setValue('isNameDuplicated', false, { shouldValidate: true });
    }
  };

  const updateDescription = (description: string) => {
    setValue('description', description, { shouldValidate: true });
  };

  const checkNameDuplicated = async () => {
    const name = formData.name;
    try {
      const response = await handleCheckName(name);

      if (response?.duplicated) {
        setValue('isNameDuplicated', true, { shouldValidate: true });
        setValue('isNameChecked', true, { shouldValidate: true });
        setError('name', {
          message: FOOD_TRUCK_ERROR_MESSAGE.nameDuplicate.duplicated,
        });
      } else {
        setValue('isNameChecked', true, { shouldValidate: true });
        setValue('isNameDuplicated', false, { shouldValidate: true });
        clearErrors('name');
      }
    } catch {
      // useFoodTruckName의 onError에서 토스트 처리됨
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

  const { mutateAsync: uploadImage } = useFoodTruckImage();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
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

    try {
      const newImageUrls = await uploadImage([selectedFile]);
      const currentPhotos = formData.photoUrls || [];
      const newUrls = newImageUrls.map(img => img.fileUrl);
      setValue('photoUrls', [...currentPhotos, ...newUrls], {
        shouldValidate: true,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : '이미지 URL 요청 중 오류가 발생했습니다.';
      setError('photoUrls', { message });
    } finally {
      e.target.value = '';
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const currentFiles = formData.photoUrls || [];
    const updatedFiles = currentFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setValue('photoUrls', updatedFiles, { shouldValidate: true });
  };

  return {
    // Data
    name: formData.name,
    description: formData.description,
    phoneNumber: formData.phoneNumber,
    photoUrls: formData.photoUrls,
    operatingInfo: formData.operatingInfo,
    option: formData.option,
    isNameChecked: formData.isNameChecked,
    isNameDuplicated: formData.isNameDuplicated,
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
  };
};
