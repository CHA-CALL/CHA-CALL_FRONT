import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ONBOARDING_SCHEMA,
  type OnboardingFormData,
} from '@pages/@owner/food-truck-onboarding/utils/onboarding-validator.schema';
import { useFoodTruckName } from '@pages/@owner/food-truck-onboarding/hooks/use-food-truck-name';
import {
  createNewFoodTruck,
  getPresignedUrls,
  uploadImage,
} from '@pages/@owner/food-truck-onboarding/api';
import { useMutation } from '@tanstack/react-query';
import { ONBOARDING_QUERY_KEY } from '@shared/querykey/food-truck-onboarding';
import type { FoodTruckCreateRequest } from 'apis/data-contracts';

import { OWNER_TEXT_ERROR_MESSAGE } from '@pages/@owner/food-truck-onboarding/constants/owner';
import { isAcceptableFile, isFileSizeValid } from '@utils/image';
import { NOT_ALLOWED_FILE_TYPE, CANNOT_UPLOAD_FILE_MB } from '@constant/image';
import { useNavigate } from 'react-router-dom';
import useToast from '@shared/hooks/use-toast';
import { ROUTES } from '@router/constant/routes';

export type OwnerFormData = OnboardingFormData;

interface UploadFilesParams {
  bizRegCert: File;
  otherDocs: File[];
}

interface UploadFilesResult {
  bizRegCertUrl: string;
  otherDocsUrls: string[];
}

export const useFoodTruckInput = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { isNameVerified, handleCheckName, resetVerification } =
    useFoodTruckName();

  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
    setError,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(ONBOARDING_SCHEMA),
    defaultValues: {
      name: '',
      bizRegCert: undefined,
      otherDocs: undefined,
    },
    mode: 'onChange',
  });

  const formData = watch();

  const uploadFilesMutation = useMutation<
    UploadFilesResult,
    Error,
    UploadFilesParams
  >({
    mutationKey: ONBOARDING_QUERY_KEY.UPLOAD_FILES(),
    mutationFn: async ({ bizRegCert, otherDocs }) => {
      const allFiles = [bizRegCert, ...otherDocs];
      const fileExtensions = allFiles.map(
        file => file.name.split('.').pop() || ''
      );

      const imageInfos = await getPresignedUrls(fileExtensions);
      if (imageInfos.length !== allFiles.length) {
        throw new Error('Presigned URL 발급 실패');
      }

      await Promise.all(
        imageInfos.map((info, index) => {
          if (!info.presignedUrl) {
            throw new Error('Presigned URL 누락');
          }
          return uploadImage(info.presignedUrl, allFiles[index]);
        })
      );

      const bizRegCertUrl = imageInfos[0].fileUrl || '';
      const otherDocsUrls = imageInfos.slice(1).map(info => info.fileUrl || '');

      return { bizRegCertUrl, otherDocsUrls };
    },
    onError: error => {
      console.error('파일 업로드 실패:', error);
      toast.error('파일 업로드에 실패했습니다.');
    },
  });

  const createFoodTruckMutation = useMutation<
    void,
    Error,
    FoodTruckCreateRequest
  >({
    mutationKey: ONBOARDING_QUERY_KEY.CREATE(),
    mutationFn: async params => {
      await createNewFoodTruck(params);
    },
    onSuccess: () => {
      toast.success('푸드트럭이 등록되었습니다.');
      navigate(ROUTES.FOOD_TRUCK_MANAGEMENT, { replace: true });
    },
    onError: error => {
      console.error('등록 실패:', error);
      toast.error('푸드트럭 등록에 실패했습니다.');
    },
  });

  const updateName = (name: string) => {
    const trimmedName = name.replace(/\s{2,}/g, ' ').trimStart();
    setValue('name', trimmedName, { shouldValidate: true });
    resetVerification();
  };

  const handleCheckNameDuplicate = async () => {
    const name = formData.name;
    const response = await handleCheckName(name);

    if (response?.duplicated) {
      setError('name', { message: OWNER_TEXT_ERROR_MESSAGE.DUPLICATE });
    }
  };

  const updateBizRegCertFile = (bizRegCert: File) => {
    if (!bizRegCert) return;
    if (!isAcceptableFile(bizRegCert)) {
      setError('bizRegCert', { message: NOT_ALLOWED_FILE_TYPE });
      return;
    }
    if (!isFileSizeValid(bizRegCert)) {
      setError('bizRegCert', { message: CANNOT_UPLOAD_FILE_MB });
      return;
    }

    setValue('bizRegCert', bizRegCert, { shouldValidate: true });
  };

  const updateOtherDocsFiles = (otherDocs: File[] | undefined) => {
    if (!otherDocs) return;
    for (const doc of otherDocs) {
      if (!isAcceptableFile(doc)) {
        setError('otherDocs', { message: NOT_ALLOWED_FILE_TYPE });
        return;
      }
      if (!isFileSizeValid(doc)) {
        setError('otherDocs', { message: CANNOT_UPLOAD_FILE_MB });
        return;
      }
    }

    setValue('otherDocs', otherDocs, { shouldValidate: true });
  };

  const onSubmit = async (formData: OwnerFormData) => {
    if (!isNameVerified) {
      setError('name', { message: OWNER_TEXT_ERROR_MESSAGE.NOT_VERIFIED });
      return;
    }

    const { bizRegCert, otherDocs } = formData;
    if (!bizRegCert || !otherDocs || otherDocs.length === 0) {
      toast.error('모든 필수 항목을 업로드해주세요.');
      return;
    }

    try {
      const { bizRegCertUrl, otherDocsUrls } =
        await uploadFilesMutation.mutateAsync({
          bizRegCert,
          otherDocs,
        });

      await createFoodTruckMutation.mutateAsync({
        name: formData.name,
        businessRegistrationUrl: bizRegCertUrl,
        otherDocumentUrls: otherDocsUrls,
      });
    } catch (error) {
      console.error('등록 실패:', error);
    }
  };

  const compatibleFormData = {
    name: formData.name,
    bizRegCert: formData.bizRegCert,
    otherDocs: formData.otherDocs || [],
  };

  const compatibleErrors = {
    name: errors.name?.message,
    bizRegCert: errors.bizRegCert?.message,
    otherDocs: errors.otherDocs?.message,
  };

  return {
    formData: compatibleFormData,
    errors: compatibleErrors,
    updateName,
    updateBizRegCertFile,
    updateOtherDocsFiles,
    handleCheckNameDuplicate,
    handleSubmit: handleSubmit(onSubmit),
    isFormValid: isValid && isNameVerified,
    isNameVerified,
  };
};
