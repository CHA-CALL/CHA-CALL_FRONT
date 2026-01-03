import { useParams } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';
import Navigation from '@components/layout/navigation/Navigation';
import { Icon } from '@components/icon/Icon';

import ErrorText from '@components/form/error-text/ErrorText';
import { useFoodTruckForm } from '@pages/@owner//food-truck-form/hooks/use-food-truck-form';
import { useUploadImages } from '@pages/@owner/upload-food-truck-images/hooks/use-upload-images';
import {
  UploadDescription,
  UploadFooter,
  UploadImagesGrid,
} from '@pages/@owner/upload-food-truck-images/components';

export default function UploadFoodTruckImages() {
  const { foodTruckId } = useParams();
  const foodTruckIdNumber = Number(foodTruckId);
  const methods = useFoodTruckForm(foodTruckIdNumber);

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
        centerContent='사진 등록'
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
      <div className='p-[2rem]'>{error && <ErrorText text={error} />}</div>
      <UploadFooter
        imagesLength={images.length}
        handleSubmitImage={handleSubmitImage}
      />
    </>
  );
}
