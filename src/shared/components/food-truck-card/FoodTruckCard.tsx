import { type FoodTruckCardProps } from '@components/food-truck-card/FoodTruckCard.types';
import { Icon, type IconId } from '@components/icon/Icon';
import Tag from '@components/tag/Tag';

export default function FoodTruckCard(props: FoodTruckCardProps) {

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

  switch (props.variant) {
    case 'reservationProvider':
      return (
        <div className='flex w-full p-[2rem] bg-white'>
          <img
            src={props.image}
            alt={props.clientName}
            className='w-[5rem] h-[5rem] mr-[1.6rem] rounded-[1.6rem] object-cover'
          />

          <div className='flex flex-col gap-[0.2rem]'>
            <div className='flex items-center gap-[0.8rem] mb-[0.2rem]'>
              <span className='title-sb-16 text-grayscale-900'>{props.clientName}</span>
              <Tag title={props.foodTruckName} />
            </div>
            {infoRow(props.location, 'ic_locate')}
            {infoRow(props.period, 'ic_calendar')}
            {infoRow(props.time, 'ic_error')}
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
        <div className='flex w-full p-[2rem] bg-white'>
          <img
            src={props.image}
            alt={props.foodTruckName}
            className='w-[8rem] h-[8rem] mr-[1.6rem] rounded-[1.6rem] object-cover'
          />

          <div className='flex flex-col gap-[0.2rem]'>
            <span className='title-sb-16 text-grayscale-900'>{props.foodTruckName}</span>
            {infoRow(props.location, 'ic_locate')}
            {infoRow(props.period, 'ic_calendar')}
            {infoRow(props.time, 'ic_error')}
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