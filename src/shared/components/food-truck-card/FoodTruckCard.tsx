import { cn } from '@utils/cn';
import { type FoodTruckCardProps } from '@components/food-truck-card/FoodTruckCard.types';
import { Icon, type IconId } from '@components/icon/Icon';
import Tag from '@components/tag/Tag';

export default function FoodTruckCard(props: FoodTruckCardProps) {

  function infoRow(
    iconId: IconId,
    children: string,
  ) {
    return (
      <div className='flex items-center gap-[0.6rem]'>
        <Icon name={iconId} width={16} height={16} className='text-grayscale-300' />
        <span className='caption-m-11 text-grayscale-700 line-clamp-1'>{children}</span>
      </div>
    );
  }

  switch (props.variant) {
    case 'reservationProvider':
      return (
        <div
          className={cn(
            'flex w-full p-[2rem] bg-white',
            { 'border-b border-grayscale-100': !props.isLast },
          )}
        >
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
            {infoRow('ic_locate', props.location)}
            {infoRow('ic_calendar', props.period)}
            {infoRow('ic_error', props.time)}
          </div>

          <button
            type='button'
            onClick={props.handleClickButton}
            className='ml-auto text-grayscale-700'
          >
            <Icon name='ic_next' />
          </button>
        </div>
      );

    case 'reservationClient':
      return (
        <div
          className={cn(
            'flex w-full p-[2rem] bg-white',
            { 'border-b border-grayscale-100': !props.isLast },
          )}
        >
          <img
            src={props.image}
            alt={props.foodTruckName}
            className='w-[8rem] h-[8rem] mr-[1.8rem] rounded-[1.6rem] object-cover'
          />

          <div className='flex flex-col gap-[0.2rem]'>
            <span className='title-sb-16 text-grayscale-900'>{props.foodTruckName}</span>
            {infoRow('ic_locate', props.location)}
            {infoRow('ic_calendar', props.period)}
            {infoRow('ic_error', props.time)}
          </div>

          <button
            type='button'
            onClick={props.handleClickButton}
            className='ml-auto text-grayscale-700'
          >
            <Icon name='ic_next' />
          </button>
        </div>
      );

    case 'foodtruckProvider':
      return (
        <div
          onClick={props.handleClickCard}
          className={cn(
            'flex w-full p-[2rem] bg-white cursor-pointer',
            { 'border-b border-grayscale-100': !props.isLast },
          )}
        >
          <img
            src={props.image}
            alt={props.foodTruckName}
            className='w-[7.4rem] h-[7.4rem] mr-[1.3rem] my-[0.4rem] rounded-[1.6rem] object-cover'
          />

          <div className='flex flex-col'>
            <span className='title-sb-16 text-grayscale-900 text-left'>{props.foodTruckName}</span>
            <span className='caption-m-11 text-grayscale-700 mb-[0.4rem] px-[0.2rem] text-left'>{props.description}</span>
            {infoRow('ic_error', props.time)}
            {infoRow('ic_locate', props.locations)}
          </div>

          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              props.handleClickButton();
            }}
            className='ml-auto mb-auto text-grayscale-700'
          >
            <Icon name='ic_team' />
          </button>
        </div>
      );

    case 'foodtruckClient':
      return (
        <div
          onClick={props.handleClickCard}
          className={cn(
            'flex w-full px-[2rem] py-[2.2rem] bg-white cursor-pointer',
            { 'border-b border-grayscale-100': !props.isLast },
            { 'pt-[0.2rem]': props.isFirst },
          )}
        >
          <img
            src={props.image}
            alt={props.foodTruckName}
            className='w-[8rem] h-[8rem] mr-[1.6rem] rounded-[1.6rem] object-cover'
          />

          <div className='flex flex-col'>
            <div className='flex items-center'>
              <span className='title-sb-16 text-grayscale-900 text-left'>{props.foodTruckName}</span>
              <Icon name='ic_close' width={18} height={16} className='ml-[0.4rem] text-grayscale-500' />
              <span className='caption-m-11 text-grayscale-500'>{props.rating}</span>
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
            onClick={(e) => {
              e.stopPropagation();
              props.handleClickButton();
            }}
            className='ml-auto mb-auto text-grayscale-700'
          >
            {props.isLiked ? <Icon name='ic_confirm' className='text-primary-700' /> : <Icon name='ic_confirm' />}
          </button>
        </div>
      );

    default:
      return null;
  }
}