import CardImage from '@components/food-truck/components/CardImage';

import InfoRow from '@components/food-truck/components/InfoRow';
import Button from '@ui/button/Button';
import ButtonCheck from '@ui/button-check/ButtonCheck';
import type { FoodTruckProviderProps } from '@components/food-truck/types/food-truck-card-types';
import { cn } from '@utils/cn';
import type React from 'react';

export default function FoodTruckProviderCard({
  data,
  isRemovable,
  isRemove,
  handleClickCard,
  handleCardRemove,
  handleClickButton,
  isOn,
}: FoodTruckProviderProps) {
  const {
    foodTruckId = 0,
    imageUrl = '',
    name = '',
    description = '',
    activeTime = '',
    serviceArea = '',
  } = data;
  const splitActiveTime = (activeTime ?? '')
    .split('-')
    .map(time => time.trim());

  const handleCardClick: React.MouseEventHandler<HTMLDivElement> = event => {
    const target = event.target as HTMLElement;
    if (target.closest('button')) return;
    handleClickCard(foodTruckId);
  };

  return (
    <div
      role='button'
      className={cn(
        'flex w-full items-start gap-[1.3rem] p-[2rem]',
        isRemove && 'bg-primary-25'
      )}
      onClick={handleCardClick}
    >
      {isRemovable && handleCardRemove && (
        <ButtonCheck isChecked={isRemove} handleToggle={handleCardRemove} />
      )}
      <CardImage
        imageUrl={imageUrl}
        altText={name}
        className='h-[7.4rem] w-[7.4rem]'
      />

      <div className='flex w-full flex-col'>
        <div className='flex w-full items-center justify-between'>
          <span className='title-sb-16 text-grayscale-900 text-left'>
            {name}
          </span>
          <Button
            variant='chip'
            buttonStyle={isOn ? 'selected2' : 'default'}
            handleClickButton={handleClickButton}
            className={cn(
              'h-[2.4rem] w-[6rem] p-0',
              !isOn && 'border-grayscale-200 text-grayscale-200'
            )}
          >
            {isOn ? 'ON' : 'OFF'}
          </Button>
        </div>
        <span className='caption-m-11 text-grayscale-700 mb-[0.4rem] px-[0.2rem] text-left'>
          {description}
        </span>
        <InfoRow iconId='ic_time'>
          <div className='caption-m-11 text-grayscale-700 flex items-center gap-[0.2rem]'>
            <span>{splitActiveTime[0]}</span>
            <span>-</span>
            <span>{splitActiveTime[1]}</span>
          </div>
        </InfoRow>
        <InfoRow iconId='ic_locate'>
          <span className='caption-m-11 text-grayscale-700 line-clamp-1'>
            {serviceArea}
          </span>
        </InfoRow>
      </div>
    </div>
  );
}
