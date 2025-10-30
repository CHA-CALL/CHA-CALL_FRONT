import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BIZ_REG_CERT_FILE_VALIDATOR,
  OTHER_DOCS_FILES_VALIDATOR,
} from '@pages/@owner/food-truck-onboarding/hooks/use-file-upload';
import {
  FOOD_TRUCK_NAME_VALIDATOR,
  useFoodTruckName,
} from '@pages/@owner/food-truck-onboarding/hooks/use-food-truck-name';
import {
  OWNER_MEDIA_ERROR_MESSAGE,
  OWNER_MEDIA_MIN_COUNT,
  OWNER_TEXT_ERROR_MESSAGE,
} from '@pages/@owner/food-truck-onboarding/constants/owner';
import { isAcceptableFile, isFileSizeValid } from '@shared/utils/image';
import {
  NOT_ALLOWED_FILE_TYPE,
  CANNOT_UPLOAD_FILE_MB,
} from '@shared/constant/image';

const ownerSchema = z.object({
  name: FOOD_TRUCK_NAME_VALIDATOR,
  bizRegCert: BIZ_REG_CERT_FILE_VALIDATOR,
  otherDocs: OTHER_DOCS_FILES_VALIDATOR,
});

export type OwnerFormData = z.infer<typeof ownerSchema>;

export const useFoodTruckInput = () => {
  const {
    isNameVerified,
    isCheckingDuplicate,
    handleCheckNameDuplicate,
    resetVerification,
  } = useFoodTruckName();

  const {
    handleSubmit,
    setValue,
    reset,
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

  const parsePresignedUrl = (rawPresignedUrl: string) => {
    return rawPresignedUrl.split('?')[0] || '';
  };

  const onSubmit = async (formData: OwnerFormData) => {
    if (!isCheckingDuplicate) {
      setError('name', { message: OWNER_TEXT_ERROR_MESSAGE.NOT_VERIFIED });
      return;
    }
    if (!isNameVerified) {
      setError('name', { message: OWNER_TEXT_ERROR_MESSAGE.DUPLICATE });
      return;
    }

    try {
      // 1. 사업자 등록증 파일 presigned URL 요청
      let bizRegCertUrl: string = '';
      if (formData.bizRegCert) {
        //TODO: 사업자 등록증 파일 presigned URL 요청
        bizRegCertUrl = '';
      }

      // 2. 영수증 파일 presigned URL 요청
      let otherDocsUrls: string[] = [];
      if (formData.otherDocs) {
        //TODO: 기타 서류 파일 presigned URL 요청
        otherDocsUrls = [''];
      }

      // 3. Presigned URL로 파일 업로드
      if (bizRegCertUrl.length > 0 && formData.bizRegCert) {
        //TODO: 사업자 등록증 파일 업로드
      }

      if (otherDocsUrls.length > 0 && formData.otherDocs) {
        //TODO: 기타 서류 파일 업로드
      }

      // 4. 오너 등록 제출
      const ownerRequest = {
        name: formData.name,
        bizRegCertUrl: parsePresignedUrl(bizRegCertUrl),
        otherDocsUrls: otherDocsUrls.map(url => parsePresignedUrl(url)),
      };

      if (ownerRequest) {
        //TODO: 오너 등록 제출
      }
    } catch (error) {
      console.error('오너 등록 실패:', error);
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
    reset,
    updateName,
    updateBizRegCertFile,
    updateOtherDocsFiles,
    handleCheckNameDuplicate,
    handleSubmit: handleSubmit(onSubmit),
    isFormValid: isValid && isNameVerified,
  };
};
