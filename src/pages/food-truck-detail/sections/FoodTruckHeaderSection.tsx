import { Icon } from '@components/icon/Icon';
import useImageDrag from '@pages/food-truck-detail/hooks/use-image-drag';
// import { useState } from 'react';

interface FoodTruckHeaderSectionProps {
  photoUrl: string[];
  name: string;
  isSaved: boolean;
  description: string;
  foodTruckServiceAreas: string[];
  activeTime: string;
  timeDiscussRequired: boolean;
  phoneNumber: string;
  handleClickSaveButton: () => void;
}

export default function FoodTruckHeaderSection({
  photoUrl,
  name,
  isSaved,
  description,
  foodTruckServiceAreas,
  activeTime,
  timeDiscussRequired,
  phoneNumber,
  handleClickSaveButton,
}: FoodTruckHeaderSectionProps) {
  // const [isFullLocation,setIsFullLocation]=useState(false);

  const {
    imageRef,
    currentImageIndex,
    translateImageX,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useImageDrag(photoUrl);

  return (
    <>
      <div
        className='relative overflow-hidden'
        ref={imageRef}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className='flex transition-transform duration-300 ease-out'
          style={{
            transform: `translateX(calc(${-currentImageIndex * 100}% + ${translateImageX}px))`,
          }}
        >
          {photoUrl.map((url, index) => (
            <img
              key={index}
              src={url}
              draggable={false}
              alt={`푸드트럭 이미지 ${index + 1}`}
              className='h-[21.1rem] w-full flex-shrink-0 object-cover'
            />
          ))}
        </div>

        <div className='absolute bottom-[2rem] right-[2rem] flex h-[2rem] w-[4rem] flex-row items-center justify-between rounded-full bg-black/50 px-[0.8rem] text-white caption-m-10'>
          <span>{currentImageIndex + 1}</span>
          <span>/</span>
          <span>{photoUrl.length}</span>
        </div>
      </div>

      <div className='flex flex-col gap-[1.6rem] p-[2rem]'>
        <div className='flex flex-col gap-[0.2rem]'>
          <div className='flex flex-row items-center justify-between'>
            <h1 className='text-grayscale-900 heading-sb-20'>{name}</h1>
            <Icon
              name={isSaved ? 'ic_heart_fill' : 'ic_heart_empty'}
              width={24}
              height={24}
              className='text-primary-700'
              onClick={handleClickSaveButton}
            />
          </div>
          <span className='text-grayscale-700 body-m-14'>{description}</span>
        </div>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='flex flex-row items-start gap-[0.8rem]'>
            <Icon
              name='ic_locate'
              width={18}
              height={18}
              className='min-w-[1.8rem] text-grayscale-300'
            />
            <div className='whitespace-normal break-keep text-grayscale-700 body-m-13'>
              {foodTruckServiceAreas.join(', ')}
            </div>
          </div>
          <div className='flex flex-row items-center gap-[0.8rem]'>
            <Icon
              name='ic_time'
              width={18}
              height={18}
              className='text-grayscale-300'
            />
            <div className='flex flex-row items-center gap-[0.4rem]'>
              <span className='text-grayscale-700 body-m-13'>{activeTime}</span>
              <span className='title_sb_14 text-grayscale-300'>·</span>
              <span className='text-grayscale-700 body-m-13'>
                {timeDiscussRequired ? '논의 가능' : '논의 불가능'}
              </span>
            </div>
          </div>
          <div className='flex flex-row items-center gap-[0.8rem]'>
            <Icon
              name='ic_phone'
              width={18}
              height={18}
              className='text-grayscale-300'
            />
            <span className='text-grayscale-700 body-m-13'>{phoneNumber}</span>
          </div>
        </div>
      </div>
    </>
  );
}
