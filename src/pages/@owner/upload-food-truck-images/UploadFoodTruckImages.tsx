import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormProvider, useFormContext } from 'react-hook-form';
import Navigation from '@shared/components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Information from '@shared/components/information/Information';
import { useBasicInfo } from '@pages/@owner/food-truck-form/hooks/use-basic-info';
import {
  useFoodTruckForm,
  type FoodTruckFormData,
} from '@pages/@owner/food-truck-form/utils/use-food-truck-form';
import ButtonAddImage from '@shared/components/button-add-image/ButtonAddImage';
import Button from '@shared/components/button/Button';
import { FOOD_TRUCK_MAX_LENGTH } from '@pages/@owner/food-truck-form/constants/food-truck';
import ErrorText from '@shared/components/error-text/ErrorText';
import { ROUTES } from '@router/constant/routes';
import SortableImagePreview from '@pages/@owner/upload-food-truck-images/components/SortableImagePreview';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSwappingStrategy,
} from '@dnd-kit/sortable';
import { useUploadImage } from './hooks/use-upload-image';

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
    photoUrls,
    photoUrlsError,
    // handleFileChange,
    // handleRemoveFile,
    handleSubmit,
  } = useBasicInfo();

  const {
    images,
    imagePreviews,
    error,
    isProcessing,
    handleLeftClick,
    handleFileChange,
    handleRemoveFile,
    handleReorderFiles,
    handleSubmitImage,
  } = useUploadImage();

  // const handleLeftClick = () => {
  //   const fromPage = location.state?.from;
  //   navigate(ROUTES.FOOD_TRUCK_FORM, {
  //     state: {
  //       from: fromPage || 'food-truck-form',
  //       formData: getValues(),
  //     },
  //   });
  // };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = Number(active.id);
      const newIndex = Number(over.id);
      handleReorderFiles(oldIndex, newIndex);
    }
  };

  const canAdd = (images?.length || 0) < FOOD_TRUCK_MAX_LENGTH.photoUrls.max;
  const fileIds = images?.map((_, index) => index) || [];

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
          text='드래그하여 대표 이미지 설정 및 순서를 조정해보세요!'
          className='w-full'
        />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={fileIds} strategy={rectSwappingStrategy}>
          <div className='grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-x-[1.4rem] gap-y-[2rem] p-[2rem]'>
            {canAdd && <ButtonAddImage handleFileChange={handleFileChange} className='h-[9rem] w-[9rem] m-[1rem]'/>}
            {images.map((_, index) => (
              <SortableImagePreview
                id={index}
                isMain={index === 0}
                key={`foodTruck-${index}`}
                handleClose={() => handleRemoveFile(index)}
                src={imagePreviews[index] || undefined}
                alt='foodTruck'
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className='p-[2rem]'>
        {photoUrlsError && <ErrorText text={photoUrlsError} />}
      </div>

      <footer className='fixed bottom-[1.7rem] left-[0rem] right-[0rem] mx-auto w-full max-w-[60rem] bg-white px-[2rem]'>
        <Button
          variant='cta'
          buttonStyle={(images.length || 0) > 0 ? 'active' : 'disabled'}
          handleClickButton={handleSubmitImage}
          disabled={(images.length || 0) === 0}
        >
          등록하기
        </Button>
      </footer>
    </>
  );
}
