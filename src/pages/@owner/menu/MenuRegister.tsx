import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/router/constant/routes';
import { Icon } from '@components/icon/Icon';
import Navigation from '@shared/components/layout/navigation/Navigation';
import Button from '@shared/components/ui/button/Button';
import { useMenuForm } from '@pages/@owner/menu/hooks/use-menu-form';
import MenuInput from '@pages/@owner/menu/components/MenuInput';
import ButtonAddImage from '@shared/components/ui/button-add-image/ButtonAddImage';
import ImagePreview from '@shared/components/ui/image-preview/ImagePreview';
import { MENU_LIMIT } from '@pages/@owner/menu/constant/menu';
import Input from '@shared/components/ui/input/Input';
import Textarea from '@shared/components/ui/text-area/Textarea';
import { IMAGE_INFO_MESSAGE } from '@shared/constant/image';

export default function MenuRegister() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const canAdd = !imageUrl;

  const {
    formData,
    errors,
    isValid,
    updateName,
    updateDescription,
    updatePrice,
    updateImageUrl,
    handleSubmit,
    trigger,
  } = useMenuForm();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      updateImageUrl(selectedFile);
    }
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    setImageUrl(null);
    updateImageUrl(null);
  };

  const handleClearName = () => {
    updateName('');
  };

  useEffect(() => {
    if (formData.imageUrl) {
      const reader = new FileReader();
      reader.onload = e => {
        setImageUrl(e.target?.result as string);
      };
      reader.onerror = () => {
        setImageUrl(null);
      };
      reader.readAsDataURL(formData.imageUrl);
    } else {
      setImageUrl(null);
    }
  }, [formData.imageUrl]);

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleClickSubmit = async () => {
    const isFormValid = await trigger();

    if (!isFormValid) {
      // TODO: 에러 처리
      return;
    }

    await handleSubmit();
    // TODO: 성공 처리
    navigate(ROUTES.MENU_LIST);
  };

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
        text='메뉴 등록'
      />

      <div className='flex flex-col gap-[2.4rem] p-[2rem] pb-[8.5rem]'>
        <MenuInput title='메뉴 이름' error={errors.name}>
          <Input
            placeholder='텍스트를 입력해주세요.'
            value={formData.name}
            onChange={e => updateName(e.target.value)}
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
              handleChange={e => updateDescription(e.target.value)}
              maxLength={MENU_LIMIT.DESCRIPTION_MAX_LENGTH}
              className='h-[12.2rem]'
            />
          </div>
        </MenuInput>

        <MenuInput title='가격' error={errors.price}>
          <Input
            type='text'
            inputMode='numeric'
            placeholder='텍스트를 입력해주세요.'
            value={formData.price}
            onChange={e => updatePrice(e.target.value)}
            className='border-grayscale-300 focus-within:border-grayscale-700'
          />
        </MenuInput>

        <MenuInput
          title='사진 등록'
          error={errors.imageUrl}
          maxLength={1}
          currentLength={formData.imageUrl ? 1 : 0}
        >
          <div className='flex'>
            {canAdd && <ButtonAddImage handleFileChange={handleFileChange} />}
            {formData.imageUrl && (
              <ImagePreview
                key='photo-preview'
                handleClose={handleRemoveFile}
                src={
                  formData.imageUrl
                    ? URL.createObjectURL(formData.imageUrl)
                    : undefined
                }
                alt='image-preview'
              />
            )}
          </div>
          <p className='caption-m-12 text-grayscale-300'>
            {IMAGE_INFO_MESSAGE}
          </p>
        </MenuInput>
      </div>

      <footer className='fixed-center bottom-[0] w-full bg-white px-[2rem] py-[1.7rem]'>
        <Button
          variant='cta'
          buttonStyle={isValid ? 'active' : 'disabled'}
          handleClickButton={handleClickSubmit}
        >
          저장하기
        </Button>
      </footer>
    </>
  );
}
