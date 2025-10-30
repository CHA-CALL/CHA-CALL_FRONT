import type { ChangeEvent } from 'react';
import { Icon } from '@components/icon/Icon';
import Input from '@components/input/Input';
import Textarea from '@components/text-area/Textarea';
import ButtonAddImage from '@components/button-add-image/ButtonAddImage';
import ImagePreview from '@components/image-preview/ImagePreview';
import MenuInput from '@pages/@owner/menu/components/MenuInput';
import { MENU_LIMIT } from '@pages/@owner/menu/constant/menu';
import type { MenuFormData } from '@pages/@owner/menu/hooks/use-form-validation';
import { useMenuForm } from '@pages/@owner/menu/hooks/use-menu-form';
import { IMAGE_INFO_MESSAGE } from '@shared/constant/image';
import { useFormContext } from 'react-hook-form';

interface MenuFormProps {
  initialImageUrl?: string;
  updateName: (_name: string) => void;
  updateDescription: (_description: string) => void;
  updatePrice: (_price: string) => void;
  updateImageUrl: (_image: File | null) => void;
}

export default function MenuForm({
  initialImageUrl,
  updateName,
  updateDescription,
  updatePrice,
  updateImageUrl,
}: MenuFormProps) {
  const {
    watch,
    formState: { errors },
  } = useFormContext<MenuFormData>();

  const formData = watch();

  const {
    imageUrl,
    canAdd,
    handleFileChange,
    handleRemoveFile,
    handleClearName,
  } = useMenuForm({
    initialImageUrl,
    updateName,
    updateImageUrl,
  });

  return (
    <>
      <div className='flex flex-col gap-[2.4rem] p-[2rem] pb-[16rem]'>
        <MenuInput title='메뉴 이름' error={errors.name?.message}>
          <Input
            placeholder='텍스트를 입력해주세요.'
            value={formData.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateName(e.target.value.trim())
            }
            maxLength={MENU_LIMIT.NAME_MAX_LENGTH}
            rightComponent={
              <button onClick={handleClearName} className='flex items-center'>
                <Icon name='ic_close' />
              </button>
            }
            className='border-grayscale-300 focus-within:border-grayscale-700'
          />
        </MenuInput>

        <MenuInput title='메뉴 설명' error={errors.description?.message}>
          <div className='flex flex-col gap-[0.6rem]'>
            <Textarea
              placeholder='텍스트를 입력해주세요.'
              value={formData.description}
              handleChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                updateDescription(e.target.value)
              }
              maxLength={MENU_LIMIT.DESCRIPTION_MAX_LENGTH}
              className='h-[12.2rem]'
            />
          </div>
        </MenuInput>

        <MenuInput title='가격' error={errors.price?.message}>
          <Input
            type='text'
            inputMode='numeric'
            placeholder='텍스트를 입력해주세요.'
            value={formData.price}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updatePrice(e.target.value)
            }
            className='border-grayscale-300 focus-within:border-grayscale-700'
          />
        </MenuInput>

        <MenuInput
          title='사진 등록'
          error={errors.imageUrl?.message}
          maxLength={1}
          currentLength={imageUrl ? 1 : 0}
        >
          <div className='flex'>
            {canAdd && <ButtonAddImage handleFileChange={handleFileChange} />}
            {imageUrl && (
              <ImagePreview
                key='image-preview'
                handleClose={handleRemoveFile}
                src={imageUrl}
                alt='image-preview'
              />
            )}
          </div>
          <p className='caption-m-12 text-grayscale-300'>
            {IMAGE_INFO_MESSAGE}
          </p>
        </MenuInput>
      </div>
    </>
  );
}
