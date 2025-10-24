import { useState } from 'react';
import { addMonths, format } from 'date-fns';

import { Icon } from '@components/icon/Icon';

import ScheduleCalendarDay from '@pages/food-truck-detail/components/ScheduleCalendarDay';
import getScheduleDays from '@pages/food-truck-detail/utils/get-schedule-days';

interface ScheduleCalendarProps {
  availableDates: string[];
}

const DAY_OF_THE_WEEK_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

export default function ScheduleCalendar({
  availableDates,
}: ScheduleCalendarProps) {
  const currentMonth = new Date();
  const [calendarMonth, setCalendarMonth] = useState(currentMonth);

  const year = format(calendarMonth, 'yyyy');
  const month = format(calendarMonth, 'M');
  const alreadyPassedMonth = calendarMonth <= currentMonth;

  const handlePrevMonth = () => setCalendarMonth(prev => addMonths(prev, -1));

  const handleNextMonth = () => setCalendarMonth(prev => addMonths(prev, 1));

  const calendarDays = getScheduleDays(Number(year), Number(month));

  return (
    <div>
      <div className='mb-[1.6rem] flex flex-row items-center justify-between pl-[calc(50%/7-1rem)] pr-[calc(50%/7-1.5rem)]'>
        <h3 className='text-grayscale-900 heading-sb-18'>
          {year}년 {month}월
        </h3>
        <div className='flex flex-row gap-[1.2rem]'>
          <button
            type='button'
            onClick={handlePrevMonth}
            disabled={alreadyPassedMonth}
          >
            <Icon
              name='ic_back'
              className={
                alreadyPassedMonth ? 'text-grayscale-200' : 'text-grayscale-700'
              }
            />
          </button>
          <button type='button' onClick={handleNextMonth}>
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
      <div className='grid grid-cols-7 body-m-14'>
        {calendarDays.map(day => (
          <ScheduleCalendarDay
            key={`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`}
            availableDates={availableDates}
            day={day}
          />
        ))}
      </div>
    </div>
  );
}
