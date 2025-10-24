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
import { OWNER_TEXT_ERROR_MESSAGE } from '@pages/@owner/food-truck-onboarding/constants/owner';
import {
  createNewFoodTruck,
  getPresignedUrls,
  uploadImage,
} from '@pages/@owner/food-truck-onboarding/api';

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

export const useFoodTruckInput = () => {
  const {
    isNameVerified,
    isCheckingDuplicate,
    handleCheckNameDuplicate: checkNameDuplicate,
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

  const handleCheckNameDuplicate = async () => {
    const name = formData.name;
    const isAvailable = await checkNameDuplicate(name);
    if (!isAvailable) {
      setError('name', { message: OWNER_TEXT_ERROR_MESSAGE.DUPLICATE });
    }
  };

  const updateBizRegCertFile = (bizRegCert: File | undefined) => {
    setValue('bizRegCert', bizRegCert, { shouldValidate: true });
  };

  const updateOtherDocsFiles = (otherDocs: File[] | undefined) => {
    setValue('otherDocs', otherDocs, { shouldValidate: true });
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

    const { bizRegCert, otherDocs } = formData;
    if (!bizRegCert || !otherDocs || otherDocs.length === 0) {
      return;
    }

    try {
      const allFiles = [bizRegCert, ...otherDocs];
      const fileExtensions = allFiles.map((file) => {
        return file.name.split('.').pop() || '';
      });

      const imageInfos = await getPresignedUrls(fileExtensions);
      imageInfos.map((info, index) => {
        if (info.presignedUrl) {
          uploadImage(info.presignedUrl, allFiles[index]);
        }
      });

      const bizRegCertUrl = imageInfos[0].fileUrl || '';
      const otherDocsUrls = imageInfos.slice(1).map((info) => info.fileUrl || '');

      await createNewFoodTruck({
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
    reset,
    updateName,
    updateBizRegCertFile,
    updateOtherDocsFiles,
    handleCheckNameDuplicate,
    handleSubmit: handleSubmit(onSubmit),
    isFormValid: isValid && isNameVerified,
    isNameVerified,
  };
};
