import Navigation from '@shared/components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Information from '@shared/components/information/Information';
import {
  useFoodTruck,
  MAX_IMAGE_COUNT,
} from '@pages/@owner/upload-food-truck/hooks/use-food-truck';
import ButtonAddImage from '@shared/components/button-add-image/ButtonAddImage';
import ImagePreview from '@shared/components/image-preview/ImagePreview';
import { useEffect, useState } from 'react';
import Button from '@shared/components/button/Button';
import ErrorText from '@shared/components/error-text/ErrorText';
import { useNavigate } from 'react-router-dom';
import { IMAGE_INFO_MESSAGE } from '@shared/constant/image';

export default function UploadFoodTruck() {
  const navigate = useNavigate();

  const {
    files,
    error,
    handleFileChange,
    handleRemoveFile,
    handleSubmitImage,
  } = useFoodTruck();

  const handleLeftClick = () => {
    navigate(-1);
  };

  const [imageUrl, setImageUrl] = useState<string[] | null>([]);

  useEffect(() => {
    const urls = files.map(file => URL.createObjectURL(file));
    setImageUrl(urls);
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);

  const canAdd = files.length < MAX_IMAGE_COUNT;

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
        {files &&
          files.map((_, index) => (
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
      <p className='caption-m-12 text-grayscale-300 px-[2rem]'>
        {IMAGE_INFO_MESSAGE}
      </p>
      <div className='p-[2rem]'>{error && <ErrorText text={error} />}</div>
      <footer className='fixed bottom-[1.7rem] left-[0rem] right-[0rem] mx-auto w-full max-w-[60rem] bg-white px-[2rem]'>
        <Button
          variant='cta'
          buttonStyle={files.length > 0 ? 'active' : 'disabled'}
          handleClickButton={handleSubmitImage}
          disabled={files.length === 0}
        >
          등록하기
        </Button>
      </footer>
    </>
  );
}
