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
} from '@shared/constant/image';
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
    .refine(
      val => val.replace(/,/g, '').length >= MENU_LIMIT.PRICE_MIN_LENGTH,
      MENU_ERROR_MESSAGE.PRICE_MIN
    )
    .transform(val => Number(val.replace(/,/g, '')).toLocaleString()),

  image: z
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
    ),
});

export type MenuFormData = z.infer<typeof menuSchema>;

export const useFormValidation = () => {
  const {
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
    setError,
    watch,
    reset,
  } = useForm<MenuFormData>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      image: undefined,
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

  const updateImage = (image: File | null) => {
    if (!image) {
      setError('image', {
        message: MENU_ERROR_MESSAGE.IMAGE_MIN_COUNT(MENU_LIMIT.IMAGE_MIN_COUNT),
      });
      return;
    }

    setValue('image', image, { shouldValidate: true });
  };

  const Errors = {
    name: errors.name?.message,
    description: errors.description?.message,
    price: errors.price?.message,
    image: errors.image?.message,
  };

  return {
    formData,
    errors: Errors,
    isValid,
    updateName,
    updateDescription,
    updatePrice,
    updateImage,
    handleSubmit,
    trigger,
    reset,
  };
};
