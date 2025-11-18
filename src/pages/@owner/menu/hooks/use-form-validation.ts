import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MENU_NAME_VALIDATOR,
  MENU_DESCRIPTION_VALIDATOR,
  MENU_PRICE_VALIDATOR,
  MENU_IMAGE_VALIDATOR,
} from '@pages/@owner/menu/utils/menu-form-validator.schema';

const menuSchema = z
  .object({
    name: MENU_NAME_VALIDATOR,
    description: MENU_DESCRIPTION_VALIDATOR,
    price: MENU_PRICE_VALIDATOR,
    imageUrl: MENU_IMAGE_VALIDATOR,
  });

export type MenuFormData = z.infer<typeof menuSchema>;

export const useFormValidation = (initialData?: Partial<MenuFormData>) => {
  const methods = useForm<MenuFormData>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      imageUrl: undefined,
      ...initialData,
    },
    mode: 'onChange',
  });

  const {
    setValue,
    formState: { isValid, errors },
  } = methods;

  const updateName = (name: string) => {
    setValue('name', name, { shouldValidate: true });
  };

  const updateDescription = (description: string) => {
    setValue('description', description, { shouldValidate: true });
  };

  const updatePrice = (price: string) => {
    const numbersOnly = price.replace(/[^\d]/g, '');
    if (numbersOnly === '') {
      setValue('price', 0, { shouldValidate: true });
      return;
    }
    const numericPrice = Number(numbersOnly);
    setValue('price', numericPrice, { shouldValidate: true });
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
    errors: Errors,
    isValid,
    updateName,
    updateDescription,
    updatePrice,
    updateImageUrl,
  };
};
