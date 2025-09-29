import React from 'react';
import { cn } from '@utils/cn';
import { type FoodTruckCardProps } from '@components/food-truck-card/FoodTruckCard.types';
import { Icon } from '@components/icon/Icon';
import InfoRow from '@components/food-truck-card/InfoRow';
import Tag from '@components/tag/Tag';
import { FOOD_TRUCK_CARD_VARIANTS } from '@shared/constant/food-truck-card-variants';

export default function FoodTruckCard(props: FoodTruckCardProps) {
  const handleClickButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.handleClickButton();
  };

  const handleClickCard = () => {
    if (props.variant === FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_PROVIDER || props.variant === FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_CLIENT) {
      props.handleClickCard();
    }
  };

  const renderCard = () => {
    switch (props.variant) {
      case FOOD_TRUCK_CARD_VARIANTS.RESERVATION_PROVIDER:
        return (
          <>
            <img
              src={props.image}
              alt={props.clientName}
              className='w-[5rem] h-[5rem] mr-[1.8rem] my-[0.4rem] rounded-[1.6rem] object-cover'
            />

            <div className='flex flex-col gap-[0.2rem]'>
              <div className='flex items-center gap-[0.8rem] mb-[0.2rem]'>
                <span className='title-sb-16 text-grayscale-900'>{props.clientName}</span>
                <Tag title={props.foodTruckName} />
              </div>
              <InfoRow iconId='ic_locate'>{props.location}</InfoRow>
              <InfoRow iconId='ic_calendar'>{props.period}</InfoRow>
              <InfoRow iconId='ic_time'>{props.time}</InfoRow>
            </div>

            <button
              type='button'
              onClick={handleClickButton}
              className='ml-auto text-grayscale-700'
            >
              <Icon name='ic_next' />
            </button>
          </>
        );

      case FOOD_TRUCK_CARD_VARIANTS.RESERVATION_CLIENT:
        return (
          <>
            <img
              src={props.image}
              alt={props.foodTruckName}
              className='w-[8rem] h-[8rem] mr-[1.8rem] rounded-[1.6rem] object-cover'
            />

            <div className='flex flex-col gap-[0.2rem]'>
              <span className='title-sb-16 text-grayscale-900'>{props.foodTruckName}</span>
              <InfoRow iconId='ic_locate'>{props.location}</InfoRow>
              <InfoRow iconId='ic_calendar'>{props.period}</InfoRow>
              <InfoRow iconId='ic_time'>{props.time}</InfoRow>
            </div>

            <button
              type='button'
              onClick={handleClickButton}
              className='ml-auto text-grayscale-700'
            >
              <Icon name='ic_next' />
            </button>
          </>
        );

      case FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_PROVIDER:
        return (
          <>
            <img
              src={props.image}
              alt={props.foodTruckName}
              className='w-[7.4rem] h-[7.4rem] mr-[1.3rem] my-[0.4rem] rounded-[1.6rem] object-cover'
            />

            <div className='flex flex-col'>
              <span className='title-sb-16 text-grayscale-900 text-left'>{props.foodTruckName}</span>
              <span className='caption-m-11 text-grayscale-700 mb-[0.4rem] px-[0.2rem] text-left'>{props.description}</span>
              <InfoRow iconId='ic_time'>{props.time}</InfoRow>
              <InfoRow iconId='ic_locate'>{props.locations}</InfoRow>
            </div>

            <button
              type='button'
              onClick={handleClickButton}
              className='ml-auto mb-auto text-grayscale-700'
            >
              <Icon name='ic_dot' />
            </button>
          </>
        );

      case FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_CLIENT:
        return (
          <>
            <img
              src={props.image}
              alt={props.foodTruckName}
              className='w-[8rem] h-[8rem] mr-[1.6rem] rounded-[1.6rem] object-cover'
            />

            <div className='flex flex-col'>
              <div className='flex items-center'>
                <span className='title-sb-16 text-grayscale-900 text-left'>{props.foodTruckName}</span>
                <Icon name='ic_star_small' width={18} height={16} className='ml-[0.7rem] text-grayscale-500' />
                <span className='caption-m-11 text-grayscale-500 ml-[0.3rem]'>{props.rating}</span>
                <span className='caption-m-10 text-grayscale-300 ml-[0.2rem]'>({props.reviewCount})</span>
              </div>
              <span className='caption-m-11 text-grayscale-700 mb-[0.4rem] text-left'>{props.description}</span>
              <div className='flex items-center gap-[0.5rem] mt-[0.8rem]'>
                {props.tags.map((tag, index) => (
                  <Tag key={index} title={String(tag)} />
                ))}
              </div>
            </div>

            <button
              type='button'
              onClick={handleClickButton}
              className='ml-auto mb-auto text-grayscale-700'
            >
              {props.isLiked ? <Icon name='ic_heart_fill' className='text-primary-700' /> : <Icon name='ic_heart_fill' />}
            </button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      onClick={handleClickCard}
      className={cn(
        'flex w-full bg-white',
        (props.variant === FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_PROVIDER
          || props.variant === FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_CLIENT)
          && 'cursor-pointer',
        props.className,
      )}
    >
      {renderCard()}
    </div>
  );
}