import React from 'react';
import { type FoodTruckCardProps } from '@components/food-truck-card/FoodTruckCard.types';
import { Icon, type IconId } from '@components/icon/Icon';
import Tag from '@components/tag/Tag';

export default function FoodTruckCard(props: FoodTruckCardProps) {
  const BaseCard = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className='flex w-full'>
        {children}
      </div>
    );
  }

  function infoRow(
    children: string,
    iconId: IconId
  ) {
    return (
      <div className='flex items-center gap-[0.6rem]'>
        <Icon name={iconId} width={16} height={16} className='text-grayscale-300' />
        <span className='caption-m-11 text-grayscale-700'>{children}</span>
      </div>
    );
  }

  const renderContent = () => {
    switch (props.variant) {
      case 'reservationProvider':
        return (
          <>
            {infoRow(props.location, 'ic_locate')}
            {infoRow(props.period, 'ic_calendar')}
            {infoRow(props.time, 'ic_error')}
          </>
        );

      case 'reservationClient':
        return (
          <div>2</div>
        );

      case 'foodtruckProvider':
        return (
          <div>3</div>
        );

      case 'foodtruckClient':
        return (
          <div>4</div>
        );

      default:
        return null;
    }
  }

  return (
    <BaseCard>
      {renderContent()}
    </BaseCard>
  );
}