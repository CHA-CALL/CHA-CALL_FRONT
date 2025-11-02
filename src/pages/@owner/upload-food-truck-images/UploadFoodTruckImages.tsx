import { useLocation } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';
import Navigation from '@components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import ErrorText from '@shared/components/error-text/ErrorText';
import { useFoodTruckForm } from '@pages/@owner/food-truck-form/utils/use-food-truck-form';
import { useUploadImages } from '@pages/@owner/upload-food-truck-images/hooks/use-upload-images';
import UploadDescription from '@pages/@owner/upload-food-truck-images/components/UploadDescription';
import UploadImagesGrid from '@pages/@owner/upload-food-truck-images/components/UploadImagesGrid';
import UploadFooter from '@pages/@owner/upload-food-truck-images/components/UploadFooter';

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
  const {
    images,
    imagePreviews,
    error,
    handleLeftClick,
    handleFileChange,
    handleRemoveFile,
    handleReorderFiles,
    handleSubmitImage,
  } = useUploadImages();

  return (
    <>
      <Navigation
        text='사진 등록'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleLeftClick}
      />
      <UploadDescription />
      <UploadImagesGrid
        images={images}
        imagePreviews={imagePreviews}
        handleFileChange={handleFileChange}
        handleRemoveFile={handleRemoveFile}
        handleReorderFiles={handleReorderFiles}
      />
      <div className='p-[2rem]'>
        {error && <ErrorText text={error} />}
      </div>
      <UploadFooter
        imagesLength={images.length}
        handleSubmitImage={handleSubmitImage}
      />
    </>
  );
}
