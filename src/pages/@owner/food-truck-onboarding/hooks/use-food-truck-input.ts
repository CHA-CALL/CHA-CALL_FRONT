import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BIZ_REG_CERT_FILE_VALIDATOR,
  OTHER_DOCS_FILES_VALIDATOR,
} from '@pages/@owner/food-truck-onboarding/utils/onboarding-validator';
import {
  FOOD_TRUCK_NAME_VALIDATOR,
  useFoodTruckName,
} from '@pages/@owner/food-truck-onboarding/hooks/use-food-truck-name';
import {
  createNewFoodTruck,
  getPresignedUrls,
  uploadImage,
} from '@pages/@owner/food-truck-onboarding/api';
import { useMutation } from '@tanstack/react-query';
import { ONBOARDING_QUERY_KEY } from '@shared/querykey/food-truck-onboarding';
import type { FoodTruckCreateRequest } from 'apis/data-contracts';

import {
  OWNER_MEDIA_ERROR_MESSAGE,
  OWNER_MEDIA_MIN_COUNT,
  OWNER_TEXT_ERROR_MESSAGE,
} from '@pages/@owner/food-truck-onboarding/constants/owner';
import { isAcceptableFile, isFileSizeValid } from '@utils/image';
import { NOT_ALLOWED_FILE_TYPE, CANNOT_UPLOAD_FILE_MB } from '@constant/image';

const ownerSchema = z
  .object({
    name: FOOD_TRUCK_NAME_VALIDATOR,
    bizRegCert: BIZ_REG_CERT_FILE_VALIDATOR,
    otherDocs: OTHER_DOCS_FILES_VALIDATOR,
  })
  .refine((data) => {
    return !!data.bizRegCert && (!!data.otherDocs && data.otherDocs.length > 0);
  });

export type OwnerFormData = z.infer<typeof ownerSchema>;

interface UploadFilesParams {
  bizRegCert: File;
  otherDocs: File[];
}

export const useFoodTruckInput = () => {
  const {
    isNameVerified,
    handleCheckName,
    resetVerification,
  } = useFoodTruckName();

  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
    setError,
  } = useForm<OwnerFormData>({
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      name: '',
      bizRegCert: undefined,
      otherDocs: undefined,
    },
    mode: 'onChange',
  });

  const formData = watch();

  const updateName = (name: string) => {
    setValue('name', name, { shouldValidate: true });
    resetVerification();
  };

  const handleCheckNameDuplicate = async () => {
    const name = formData.name;
    const response = await handleCheckName(name);

    if (response?.duplicated) {
      setError('name', { message: OWNER_TEXT_ERROR_MESSAGE.DUPLICATE });
    }
  };

  const updateBizRegCertFile = (bizRegCert: File | undefined) => {
    if (!bizRegCert) {
      setError('bizRegCert', {
        message: OWNER_MEDIA_ERROR_MESSAGE.MAX_COUNT(
          OWNER_MEDIA_MIN_COUNT.BIZ_REG_CERT
        ),
      });
      return;
    }
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
    if (!otherDocs) {
      setError('otherDocs', {
        message: OWNER_MEDIA_ERROR_MESSAGE.MIN_COUNT(
          OWNER_MEDIA_MIN_COUNT.OTHER_DOCS
        ),
      });
      return;
    }
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

const useUploadFiles = useMutation<
    { bizRegCertUrl: string; otherDocsUrls: string[] },
    Error,
    UploadFilesParams
  >({
    mutationKey: ONBOARDING_QUERY_KEY.UPLOAD_FILES,
    mutationFn: async ({ bizRegCert, otherDocs }: UploadFilesParams) => {
      const allFiles = [bizRegCert, ...otherDocs];
      const fileExtensions = allFiles.map((file) =>
        file.name.split('.').pop() || ''
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
      const otherDocsUrls = imageInfos.slice(1).map((info) => info.fileUrl || '');

      return { bizRegCertUrl, otherDocsUrls };
    },
  });

  const useCreateFoodTruck = useMutation<
    void,
    Error,
    FoodTruckCreateRequest
  >({
    mutationKey: ONBOARDING_QUERY_KEY.CREATE,
    mutationFn: async (params: FoodTruckCreateRequest) => {
      await createNewFoodTruck(params);
    },
    onSuccess: () => {
      // TODO: 다음 페이지로 이동
      console.info('등록 성공');
    },
    onError: (error) => {
      console.error('등록 실패:', error);
    },
  });

  const onSubmit = async (formData: OwnerFormData) => {
    if (!isNameVerified) {
      setError('name', { message: OWNER_TEXT_ERROR_MESSAGE.DUPLICATE });
      return;
    }

    const { bizRegCert, otherDocs } = formData;
    if (!bizRegCert || !otherDocs || otherDocs.length === 0) {
      return;
    }

    try {
      const { bizRegCertUrl, otherDocsUrls } = await useUploadFiles.mutateAsync({
        bizRegCert,
        otherDocs,
      });

      await useCreateFoodTruck.mutateAsync({
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
