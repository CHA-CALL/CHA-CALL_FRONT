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
import { formatPrice } from '@shared/utils/price-formatter';

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
    .transform(val => formatPrice(val)),

  imageUrl: z
    .union([z.instanceof(File), z.undefined(), z.null()])
    .refine(file => file instanceof File, {
      message: MENU_ERROR_MESSAGE.IMAGE_MIN_COUNT(MENU_LIMIT.IMAGE_MIN_COUNT),
    })
    .refine(
      file => (file ? isAcceptableFile(file) : true),
      { message: NOT_ALLOWED_FILE_TYPE }
    )
    .refine(
      file => (file ? isFileSizeValid(file) : true),
      { message: CANNOT_UPLOAD_FILE_MB }
    ),
});

export type MenuFormData = z.infer<typeof menuSchema>;

export const useFormValidation = (initialData?: Partial<MenuFormData>) => {
  const methods = useForm<MenuFormData>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      imageUrl: undefined,
      ...initialData,
    },
    mode: 'onChange',
  });

  const {
    setValue,
    formState: { isValid, errors },
    // watch,
  } = methods;

  // const formData = watch();

  const updateName = (name: string) => {
    setValue('name', name, { shouldValidate: true });
  };

  const updateDescription = (description: string) => {
    // const truncatedDescription = description.slice(
    //   0,
    //   MENU_LIMIT.DESCRIPTION_MAX_LENGTH
    // );
    // setValue('description', truncatedDescription, { shouldValidate: true });
    setValue('description', description, { shouldValidate: true });
  };

  const updatePrice = (price: string) => {
    setValue('price', formatPrice(price), { shouldValidate: true });
  };

  const updateImageUrl = (image: File | null) => {
    setValue('imageUrl', image || undefined, { shouldValidate: true });
  };

  const Errors = {
    name: errors.name?.message,
    description: errors.description?.message,
    price: errors.price?.message,
    imageUrl: errors.imageUrl?.message,
  };

  return {
    methods,
    // formData,
    errors: Errors,
    isValid,
    updateName,
    updateDescription,
    updatePrice,
    updateImageUrl,
  };
};
