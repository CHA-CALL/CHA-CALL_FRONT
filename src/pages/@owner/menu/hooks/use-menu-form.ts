import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MENU_LIMIT, MENU_ERROR_MESSAGE } from '@pages/@owner/menu/constant/menu';
import { CANNOT_UPLOAD_FILE_MB, NOT_ALLOWED_FILE_TYPE } from '@shared/constant/image';
import { isAcceptableFile, isFileSizeValid } from '@shared/utils/image';

const menuSchema = z.object({
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
    // .regex(/^\d+$/, MENU_ERROR_MESSAGE.PRICE_ONLY_NUMBER)
    .min(
      MENU_LIMIT.PRICE_MIN_LENGTH,
      MENU_ERROR_MESSAGE.PRICE_MIN(MENU_LIMIT.PRICE_MIN_LENGTH)
    )
    .max(
      MENU_LIMIT.PRICE_MAX_LENGTH,
      MENU_ERROR_MESSAGE.PRICE_MAX(MENU_LIMIT.PRICE_MAX_LENGTH)
    ),

  image: z
    .union([
      z.instanceof(File),
      z.null()
    ])
    .refine(
      (file) => file !== null,
      { message: '이미지를 선택해주세요.' }
    )
    .refine(
      (file) => file === null || isFileSizeValid(file), {
      message: CANNOT_UPLOAD_FILE_MB,
    })
    .refine(
      (file) => file === null || isAcceptableFile(file), {
      message: NOT_ALLOWED_FILE_TYPE,
    }),
});

export type MenuFormData = z.infer<typeof menuSchema>;

export const useMenuForm = () => {
  const {
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors, isValid },
    watch,
  } = useForm<MenuFormData>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      image: null,
    },
    mode: 'onChange',
  });

  const formData = watch();

  const updateName = (name: string) => {
    setValue('name', name, { shouldValidate: true });
  };

  const updateDescription = (description: string) => {
    setValue('description', description, { shouldValidate: true });
  };

  const updatePrice = (price: string) => {
    const numbersOnly = price.replace(/\D/g, '');
    setValue('price', numbersOnly, { shouldValidate: true });
  };

  const updateImage = (image: File | null) => {
    setValue('image', image, { shouldValidate: true });
  };

  const onSubmit = async (formData: MenuFormData) => {
    if (isValid && formData) {
      alert('메뉴 등록 완료');
    }
  };

  const compatibleFormData = {
    name: formData.name,
    description: formData.description,
    price: formData.price,
    image: formData.image,
  };

  const compatibleErrors = {
    name: errors.name?.message,
    description: errors.description?.message,
    price: errors.price?.message,
    image: errors.image?.message,
  };

  return {
    formData: compatibleFormData,
    errors: compatibleErrors,
    isValid,
    updateName,
    updateDescription,
    updatePrice,
    updateImage,
    handleSubmit: handleSubmit(onSubmit),
    reset,
    trigger,
  };
}
