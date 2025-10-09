import React, { useState, useEffect, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Input from '@components/input/Input';
import Textarea from '@components/text-area/Textarea';
import ButtonAddImage from '@components/button-add-image/ButtonAddImage';
import ImagePreview from '@components/image-preview/ImagePreview';
import MenuInput from '@pages/@owner/menu/components/MenuInput';
import { MENU_LIMIT } from '@pages/@owner/menu/constant/menu';
import type { MenuFormData } from '@pages/@owner/menu/hooks/use-menu-form';

interface MenuFormProps {
  initialData?: {
    name: string;
    description: string;
    price: string;
    imageUrl?: string;
  };
  footerContent: React.ReactNode;
  formData: MenuFormData;
  errors: {
    name?: string;
    description?: string;
    price?: string;
    image?: string;
  };
  updateName: (_name: string) => void;
  updateDescription: (_description: string) => void;
  updatePrice: (_price: string) => void;
  updateImage: (_image: File | null) => void;
}

export default function MenuForm({
  initialData,
  footerContent,
  formData,
  errors,
  updateName,
  updateDescription,
  updatePrice,
  updateImage,
}: MenuFormProps) {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | null>(initialData?.imageUrl || null);
  const canAdd = !imageUrl;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      updateImage(selectedFile);
    }
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    setImageUrl(null);
    updateImage(null);
  };

  const handleClearName = () => {
    updateName('');
  };

  useEffect(() => {
    if (formData.image) {
      const reader = new FileReader();
      reader.onload = e => {
        setImageUrl(e.target?.result as string);
      };
      reader.onerror = () => {
        setImageUrl(null);
      };
      reader.readAsDataURL(formData.image);
    } else if (!initialData?.imageUrl) {
      setImageUrl(null);
    }
  }, [formData.image, initialData?.imageUrl]);

  // useEffect(() => {
  //   if (initialData) {
  //     updateName(initialData.name);
  //     updateDescription(initialData.description);
  //     updatePrice(initialData.price);
  //   }
  // }, [initialData, updateName, updateDescription, updatePrice]);

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
        text='메뉴 등록'
      />

      <div className='flex flex-col gap-[2.4rem] p-[2rem] pb-[10rem]'>
        <MenuInput title='메뉴 이름' error={errors.name}>
          <Input
            placeholder='텍스트를 입력해주세요.'
            value={formData.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateName(e.target.value)
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

        <MenuInput title='메뉴 설명' error={errors.description}>
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
            <div className='caption-m-12 flex items-center justify-end gap-[0.1rem]'>
              <p className='text-primary-700'>{formData.description.length}</p>
              <p className='text-grayscale-700'>/</p>
              <p className='text-grayscale-700'>
                {MENU_LIMIT.DESCRIPTION_MAX_LENGTH}
              </p>
            </div>
          </div>
        </MenuInput>

        <MenuInput title='가격' error={errors.price}>
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

        <MenuInput title='사진 등록' error={errors.image} maxLength={1} currentLength={imageUrl ? 1 : 0}>
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
        </MenuInput>
      </div>

      <footer className='fixed-center bottom-[0] w-full bg-white px-[2rem] py-[1.7rem]'>
        {footerContent}
      </footer>
    </>
  );
}
