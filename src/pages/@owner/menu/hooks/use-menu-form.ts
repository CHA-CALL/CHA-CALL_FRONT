import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MENU_LIMIT,
  MENU_ERROR_MESSAGE,
} from '@pages/@owner/menu/constant/menu';
import {
  CANNOT_UPLOAD_FILE_MB,
  NOT_ALLOWED_FILE_TYPE,
} from '@constant/image';
import { isAcceptableFile, isFileSizeValid } from '@utils/image';

export const menuSchema = z.object({
  name: z
    .string()
    .min(
      MENU_LIMIT.NAME_MIN_LENGTH,
      MENU_ERROR_MESSAGE.NAME_MIN(MENU_LIMIT.NAME_MIN_LENGTH)
    )
    .max(
      MENU_LIMIT.NAME_MAX_LENGTH,
      MENU_ERROR_MESSAGE.NAME_MAX(MENU_LIMIT.NAME_MAX_LENGTH)
    ),

  description: z
    .string()
    .min(
      MENU_LIMIT.DESCRIPTION_MIN_LENGTH,
      MENU_ERROR_MESSAGE.DESCRIPTION_MIN(MENU_LIMIT.DESCRIPTION_MIN_LENGTH)
    )
    .max(
      MENU_LIMIT.DESCRIPTION_MAX_LENGTH,
      MENU_ERROR_MESSAGE.DESCRIPTION_MAX(MENU_LIMIT.DESCRIPTION_MAX_LENGTH)
    ),

  price: z
    .string()
    .refine(
      val => val.replace(/,/g, '').length >= MENU_LIMIT.PRICE_MIN_LENGTH,
      MENU_ERROR_MESSAGE.PRICE_MIN
    )
    .transform(val => Number(val.replace(/,/g, '')).toLocaleString()),

  imageUrl: z
    .instanceof(File)
    .refine(
      file => {
        return isAcceptableFile(file);
      },
      {
        message: NOT_ALLOWED_FILE_TYPE,
      }
    )
    .refine(
      file => {
        return isFileSizeValid(file);
      },
      {
        message: CANNOT_UPLOAD_FILE_MB,
      }
    )
    .optional()
    .refine(file => file !== undefined, {
      message: '이미지를 선택해주세요',
    }),
});

export type MenuFormData = z.infer<typeof menuSchema>;

export const useMenuForm = () => {
  const {
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
    setError,
    watch,
  } = useForm<MenuFormData>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      imageUrl: undefined,
    },
    mode: 'onChange',
  });

  const formData = watch();

  const updateName = (name: string) => {
    setValue('name', name, { shouldValidate: true });
  };

  const updateDescription = (description: string) => {
    const truncatedDescription = description.slice(
      0,
      MENU_LIMIT.DESCRIPTION_MAX_LENGTH
    );
    setValue('description', truncatedDescription, { shouldValidate: true });
  };

  const updatePrice = (price: string) => {
    const numbersOnly = price.replace(/[^\d]/g, '');
    const formattedPrice = numbersOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setValue('price', formattedPrice, { shouldValidate: true });
  };

  const updateImageUrl = (imageUrl: File | null) => {
    if (imageUrl === null) {
      setValue('imageUrl', undefined, { shouldValidate: true });
      return;
    }
    if (!isAcceptableFile(imageUrl)) {
      setError('imageUrl', { message: NOT_ALLOWED_FILE_TYPE });
      return;
    }
    if (!isFileSizeValid(imageUrl)) {
      setError('imageUrl', { message: CANNOT_UPLOAD_FILE_MB });
      return;
    }
    setValue('imageUrl', imageUrl, { shouldValidate: true });
  };

  const onSubmit = async (formData: MenuFormData) => {
    if (isValid && formData) {
      alert('메뉴 등록 완료');
    }
  };

  const FormDatas = {
    name: formData.name,
    description: formData.description,
    price: formData.price,
    imageUrl: formData.imageUrl,
  };

  const Errors = {
    name: errors.name?.message,
    description: errors.description?.message,
    price: errors.price?.message,
    imageUrl: errors.imageUrl?.message,
  };

  return {
    formData: FormDatas,
    errors: Errors,
    isValid,
    updateName,
    updateDescription,
    updatePrice,
    updateImageUrl,
    handleSubmit: handleSubmit(onSubmit),
    trigger,
  };
};
