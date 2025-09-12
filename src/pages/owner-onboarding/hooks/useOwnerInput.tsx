import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BIZ_REG_CERT_FILE_VALIDATOR,
  OTHER_DOCS_FILES_VALIDATOR,
} from '@pages/owner-onboarding/hooks/useFileUpload';
import {
  OWNER_NAME_VALIDATOR,
  useOwnerName,
} from '@pages/owner-onboarding/hooks/useOwnerName';
import { OWNER_TEXT_ERROR_MESSAGE } from '@pages/owner-onboarding/constants/owner';

const ownerSchema = z.object({
  name: OWNER_NAME_VALIDATOR,
  bizRegCert: BIZ_REG_CERT_FILE_VALIDATOR,
  otherDocs: OTHER_DOCS_FILES_VALIDATOR,
});

export type OwnerFormData = z.infer<typeof ownerSchema>;

export const useOwnerInput = () => {
  const {
    isNameVerified,
    isCheckingDuplicate,
    handleCheckNameDuplicate,
    resetVerification,
  } = useOwnerName();

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
    setValue('bizRegCert', bizRegCert, { shouldValidate: true });
  };

  const updateOtherDocsFiles = (otherDocs: File[] | undefined) => {
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
    handleSubmit: () => handleSubmit(onSubmit)(),
    isFormValid: isValid && isNameVerified,
  };
};
