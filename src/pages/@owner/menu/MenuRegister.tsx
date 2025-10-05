import { useNavigate } from 'react-router-dom';
import { useState, useEffect, type ChangeEvent } from 'react';

import { ROUTES } from '@/router/constant/routes';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Button from '@components/button/Button';
import { useMenuForm } from '@pages/@owner/menu/hooks/use-menu-form';
import MenuInput from '@pages/@owner/menu/components/MenuInput';
import ButtonAddImage from '@components/button-add-image/ButtonAddImage';
import ImagePreview from '@components/image-preview/ImagePreview';
import { MENU_LIMIT } from '@pages/@owner/menu/constant/menu';
import Input from '@shared/components/input/Input';
import Textarea from '@shared/components/text-area/Textarea';

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
    updateImage,
    handleSubmit,
    trigger,
  } = useMenuForm();

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
    } else {
      setImageUrl(null);
    }
  }, [formData.image]);

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

      <div className='flex flex-col gap-[2.4rem] p-[2rem]'>
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
          />
        </MenuInput>

        <MenuInput title='사진 등록' error={errors.image}>
          <div className='flex flex-col gap-[1rem]'>
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
            <div className='caption-m-12 flex items-center justify-end gap-[0.1rem]'>
              <p className='text-primary-700'>{imageUrl?.length || 0}</p>
              <p className='text-grayscale-700'>/</p>
              <p className='text-grayscale-700'>{1}</p>
            </div>
          </div>
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
