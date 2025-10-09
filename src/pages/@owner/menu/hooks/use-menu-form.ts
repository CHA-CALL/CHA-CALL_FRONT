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

import { useMutation } from '@tanstack/react-query';
import { postFoodTruckMenu } from '@pages/@owner/menu/api';

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
    )
    .optional()
    .refine(
      (file) => file !== undefined,
      {
        message: '이미지를 선택해주세요',
      }
    ),
});

export type MenuFormData = z.infer<typeof menuSchema>;

interface InitialData {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

export const useMenuForm = (
  initialData?: InitialData,
  foodTruckId?: number,
) => {
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
      name: initialData?.name || '',
      description: initialData?.description || '',
      price: initialData?.price || '',
      image: undefined,
    },
    mode: 'onChange',
  });

  const formData = watch();

  const { mutate: registerMenu } = useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      price: number;
      photoUrl: string;
    }) => {
      return postFoodTruckMenu({
        foodTruckId: foodTruckId || 0,
        data,
      });
    },
    onSuccess: () => {
      alert('메뉴가 등록되었습니다.');
    },
  });

  const updateName = (name: string) => {
    setValue('name', name, { shouldValidate: true });
  };

  const updateDescription = (description: string) => {
    setValue('description', description, { shouldValidate: true });
  };

  const updatePrice = (price: string) => {
    const formattedPrice = price
      .replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setValue('price', formattedPrice, { shouldValidate: true });
  };

  const updateImage = (image: File | null) => {
    if (image === null) {
      setValue('image', undefined, { shouldValidate: true });
      return;
    }
    if (!isAcceptableFile(image)) {
      setError('image', { message: NOT_ALLOWED_FILE_TYPE });
      return;
    }
    if (!isFileSizeValid(image)) {
      setError('image', { message: CANNOT_UPLOAD_FILE_MB });
      return;
    }
    setValue('image', image, { shouldValidate: true });
  };

  const onSubmit = async (formData: MenuFormData) => {
    if (!isValid || !formData.image) {
      return;
    }

    const photoUrl = ''; // 이미지 업로드 후 받은 URL로 교체

    const price = Number(formData.price.replace(/,/g, ''));

    registerMenu({
      name: formData.name,
      description: formData.description,
      price,
      photoUrl,
    });
  };

  const FormDatas = {
    name: formData.name,
    description: formData.description,
    price: formData.price,
    image: formData.image,
  };

  const Errors = {
    name: errors.name?.message,
    description: errors.description?.message,
    price: errors.price?.message,
    image: errors.image?.message,
  };

  return {
    formData: FormDatas,
    errors: Errors,
    isValid,
    updateName,
    updateDescription,
    updatePrice,
    updateImage,
    handleSubmit: handleSubmit(onSubmit),
    trigger,
    reset,
  };
};
