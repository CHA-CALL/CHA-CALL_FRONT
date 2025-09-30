import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { MENU_IMAGE_MAX } from '@pages/@owner/menu/constant/menu';
import { MENU_NAME_VALIDATOR } from './use-menu-name-input';
import { MENU_DESCRIPTION_VALIDATOR } from './use-menu-desc-input';
import { MENU_PRICE_VALIDATOR } from './use-menu-price-input';
import { MENU_IMAGE_VALIDATOR } from './use-menu-image-input';

const menuSchema = z.object({
  name: MENU_NAME_VALIDATOR,
  description: MENU_DESCRIPTION_VALIDATOR,
  price: MENU_PRICE_VALIDATOR,
  images: MENU_IMAGE_VALIDATOR,
});

export type MenuFormData = z.infer<typeof menuSchema>;

export const useMenuForm = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
    watch,
    clearErrors,
  } = useForm<MenuFormData>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      images: [],
    },
    mode: 'onChange',
  });

  const formData = watch();

  useEffect(() => {
    if (formData.images?.length > 0) {
      const urls = formData.images.map((file: File) => URL.createObjectURL(file));
      setImageUrls(urls);

      return () => {
        urls.forEach(url => URL.revokeObjectURL(url));
      };
    } else {
      setImageUrls([]);
    }
  }, [formData.images]);

  const updateName = (name: string) => {
    setValue('name', name, { shouldValidate: true });
    if (errors.name) {
      clearErrors('name');
    }
  };

  const updateDescription = (description: string) => {
    setValue('description', description, { shouldValidate: true });
    if (errors.description) {
      clearErrors('description');
    }
  };

  const updatePrice = (price: string) => {
    const numericValue = price.replace(/,/g, '');

    if (numericValue === '' || /^\d+$/.test(numericValue)) {
      const formattedValue = numericValue === '' ? '' : Number(numericValue).toLocaleString();
      setValue('price', formattedValue, { shouldValidate: true });

      if (errors.price) {
        clearErrors('price');
      }
    }
  };

  const addImage = (file: File) => {
    const currentImages = formData.images || [];
    if (currentImages.length < MENU_IMAGE_MAX) {
      const newImages = [...currentImages, file];
      setValue('images', newImages, { shouldValidate: true });

      if (errors.images) {
        clearErrors('images');
      }
    }
  };

  const removeImage = (index: number) => {
    const currentImages = formData.images || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    setValue('images', newImages, { shouldValidate: true });
  };

  const clearError = (field: keyof MenuFormData) => {
    clearErrors(field);
  };

  const isAllFieldsValid = () => {
    return formData.name.trim() !== '' &&
           formData.description.trim() !== '' &&
           formData.price.trim() !== '' &&
           (formData.images?.length || 0) > 0 &&
           isValid;
  };

  return {
    formData,
    imageUrls,
    errors,
    isValid,
    isAllFieldsValid: isAllFieldsValid(),
    updateName,
    updateDescription,
    updatePrice,
    addImage,
    removeImage,
    handleSubmit,
    reset,
    clearError,
  };
};