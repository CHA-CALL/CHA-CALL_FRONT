import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormProvider, useFormContext } from 'react-hook-form';
import Navigation from '@layout/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Information from '@components/information/Information';
import { useBasicInfo } from '@pages/@owner/food-truck-form/hooks/use-basic-info';
import {
  useFoodTruckForm,
  type FoodTruckFormData,
} from '@pages/@owner/food-truck-form/utils/use-food-truck-form';
import ButtonAddImage from '@ui/button-add-image/ButtonAddImage';
import ImagePreview from '@ui/image-preview/ImagePreview';
import Button from '@ui/button/Button';
import { FOOD_TRUCK_MAX_LENGTH } from '@pages/@owner/food-truck-form/constants/food-truck';
import ErrorText from '@form/error-text/ErrorText';
import { ROUTES } from '@router/constant/routes';

export default function UploadFoodTruckImages() {
  const location = useLocation();
  const formData = location.state?.formData;
  const methods = useFoodTruckForm(formData);

  return (
    <FormProvider {...methods.methods}>
      <UploadFoodTruck />
    </FormProvider>
  );
}

function UploadFoodTruck() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getValues } = useFormContext<FoodTruckFormData>();

  const {
    photoUrls,
    photoUrlsError,
    handleFileChange,
    handleRemoveFile,
    handleSubmit,
  } = useBasicInfo();

  const handleLeftClick = () => {
    const fromPage = location.state?.from;
    navigate(ROUTES.FOOD_TRUCK_FORM, {
      state: {
        from: fromPage || 'food-truck-form',
        formData: getValues(),
      },
    });
  };

  const [imageUrl, setImageUrl] = useState<string[] | null>([]);

  useEffect(() => {
    if (photoUrls && photoUrls.length > 0) {
      const urls = photoUrls.map(file => URL.createObjectURL(file));
      setImageUrl(urls);
      return () => {
        urls.forEach(url => URL.revokeObjectURL(url));
      };
    } else {
      setImageUrl([]);
    }
  }, [photoUrls]);

  const canAdd = (photoUrls?.length || 0) < FOOD_TRUCK_MAX_LENGTH.photoUrls.max;

  return (
    <>
      <Navigation
        text='사진 등록'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleLeftClick}
      />
      <div className='flex w-full flex-col items-start justify-start gap-[1.2rem] p-[2rem]'>
        <div className='flex w-full flex-col items-start justify-start gap-[0.2rem]'>
          <p className='title-sb-16 grayscale-900'>푸드트럭 사진 등록</p>
          <p className='caption-m-11 grayscale-500'>
            사진은 순서대로 등록해주세요. 첫 번째 사진이 썸네일로 보여요!
          </p>
        </div>
        <Information
          iconId='ic_check'
          text='사진은 16:9 비율로, 가능하면 고화질 이미지를 올려주세요!'
          className='w-full'
        />
      </div>

      <div className='grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] justify-start gap-[1.2rem] p-[2rem]'>
        {photoUrls &&
          photoUrls.map((_, index) => (
            <ImagePreview
              isMain={index === 0}
              key={`foodTruck-${index}`}
              handleClose={() => handleRemoveFile(index)}
              src={imageUrl?.[index] || undefined}
              alt='foodTruck'
            />
          ))}
        {canAdd && <ButtonAddImage handleFileChange={handleFileChange} />}
      </div>
      <div className='p-[2rem]'>
        {photoUrlsError && <ErrorText text={photoUrlsError} />}
      </div>

      <footer className='fixed bottom-[1.7rem] left-[0rem] right-[0rem] mx-auto w-full max-w-[60rem] bg-white px-[2rem]'>
        <Button
          variant='cta'
          buttonStyle={(photoUrls?.length || 0) > 0 ? 'active' : 'disabled'}
          handleClickButton={handleSubmit}
          disabled={(photoUrls?.length || 0) === 0}
        >
          등록하기
        </Button>
      </footer>
    </>
  );
}
