import { Icon } from '@shared/components/icon/Icon';

const DAY_OF_THE_WEEK_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

export default function ScheduleCalendar() {
  return (
    <div>
      <div className='mb-[1.6rem] flex flex-row items-center justify-between pl-[calc(50%/7-1rem)] pr-[calc(50%/7-1.5rem)]'>
        <h3 className='text-grayscale-900 heading-sb-18'>2025년 10월</h3>
        <div className='flex flex-row gap-[1.2rem]'>
          <button type='button'>
            <Icon name='ic_back' className='text-grayscale-700' />
          </button>
          <button type='button'>
            <Icon name='ic_next' />
          </button>
        </div>
      </div>

      <div className='grid grid-cols-7 text-center text-grayscale-500 caption-r-12'>
        {DAY_OF_THE_WEEK_LABELS.map(dayOfTheWeek => (
          <span key={dayOfTheWeek} className='my-[1.2rem]'>
            {dayOfTheWeek}
          </span>
        ))}
      </div>
    </div>
  );
}
