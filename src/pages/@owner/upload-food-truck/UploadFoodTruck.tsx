import Navigation from '@shared/components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Information from '@shared/components/information/Information';
import {
  useFoodTruck,
  MAX_IMAGE_COUNT,
} from '@pages/@owner/upload-food-truck/hooks/use-food-truck';
import ButtonAddImage from '@shared/components/button-add-image/ButtonAddImage';
import { useEffect, useState } from 'react';
import Button from '@shared/components/button/Button';
import ErrorText from '@shared/components/error-text/ErrorText';
import { useNavigate } from 'react-router-dom';

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
  rectSwappingStrategy,
} from '@dnd-kit/sortable';
import SortableImagePreview from '@pages/@owner/upload-food-truck/components/SortableImagePreview';

export default function UploadFoodTruck() {
  const navigate = useNavigate();

  const {
    files,
    error,
    handleFileChange,
    handleRemoveFile,
    handleSubmitImage,
    handleReorderFiles,
  } = useFoodTruck();

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

  const fileIds = files.map((_, index) => index);

  return (
    <>
      <Navigation
        text='사진 등록'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleLeftClick}
      />
      <div className='flex w-full flex-col items-start justify-start gap-[1.2rem] p-[2rem]'>
        <div className='flex w-full flex-col items-start justify-start gap-[0.2rem]'>
          <p className='title-sb-16 text-grayscale-900'>
            푸드트럭 사진 등록
          </p>
          <p className='caption-m-11 text-grayscale-500'>
            사진은 순서대로 등록해주세요. 첫 번째 사진이 썸네일로 보여요!
          </p>
        </div>
        <Information
          iconId='ic_chat_dot'
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
            {canAdd && <ButtonAddImage handleFileChange={handleFileChange} className='h-[9rem] w-[9rem] m-[1rem]' />}
            {files.map((_, index) => (
              <SortableImagePreview
                id={index}
                isMain={index === 0}
                key={`foodTruck-${index}`}
                handleClose={() => handleRemoveFile(index)}
                src={imageUrl?.[index] || undefined}
                alt='foodTruck'
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className='p-[2rem]'>{error && <ErrorText text={error} />}</div>
      <footer className='fixed bottom-[1.7rem] left-[0rem] right-[0rem] mx-auto w-full max-w-[60rem] bg-white px-[2rem]'>
        <Button
          variant='cta'
          buttonStyle={files.length > 0 ? 'active' : 'disabled'}
          handleClickButton={handleSubmitImage}
          disabled={files.length === 0}
        >
          저장하기
        </Button>
      </footer>
    </>
  );
}
