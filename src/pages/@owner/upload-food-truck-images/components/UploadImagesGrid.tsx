import type { ChangeEvent } from 'react';
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
import ButtonAddImage from '@components/button-add-image/ButtonAddImage';
import SortableImagePreview from '@pages/@owner/upload-food-truck-images/components/SortableImagePreview';
import { FOOD_TRUCK_MAX_LENGTH } from '@pages/@owner/food-truck-form/constants/food-truck';
import type { DisplayImage } from '@pages/@owner/upload-food-truck-images/types/food-truck-image-display';

interface UploadImagesGridProps {
  images: DisplayImage[];
  imagePreviews: string[];
  handleFileChange: (_e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (_index: number) => void;
  handleReorderFiles: (_oldIndex: number, _newIndex: number) => void;
}

export default function UploadImagesGrid({
  images,
  imagePreviews,
  handleFileChange,
  handleRemoveFile,
  handleReorderFiles,
}: UploadImagesGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex(img => img.id === active.id);
      const newIndex = images.findIndex(img => img.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        handleReorderFiles(oldIndex, newIndex);
      }
    }
  };

  const canAdd = (images?.length || 0) < FOOD_TRUCK_MAX_LENGTH.photoUrls.max;
  const fileIds = images?.map(img => img.id) || [];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={fileIds} strategy={rectSwappingStrategy}>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-x-[1.4rem] gap-y-[2rem] p-[2rem]'>
          {canAdd && (
            <ButtonAddImage
              handleFileChange={handleFileChange}
              className='h-[9rem] w-[9rem] m-[1rem]'
            />
          )}
          {images.map((image, index) => (
            <SortableImagePreview
              id={image.id}
              isMain={index === 0}
              key={image.id}
              handleClose={() => handleRemoveFile(index)}
              src={imagePreviews[index] || undefined}
              alt='foodTruck'
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
