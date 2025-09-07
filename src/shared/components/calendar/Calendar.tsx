// Calendar.tsx
import { useState } from 'react';

import { Icon } from '../icon/Icon';
import { useCalendarDays } from '@shared/hooks/useCalendarDays';
import Button from '../button/Button';

interface CalendarProps {
  handleCloseBottomSheet: () => void;
}

const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calendar({ handleCloseBottomSheet }: CalendarProps) {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  const days = useCalendarDays(year, month);

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(prev => prev - 1);
      setMonth(12);
    } else {
      setMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(prev => prev + 1);
      setMonth(1);
    } else {
      setMonth(prev => prev + 1);
    }
  };

  return (
    <div className='w-full h-[40.5rem] relative flex flex-col justify-between'>
      <div>
        <div className='flex flex-row justify-between items-center mb-[1.6rem] pl-[calc(50%/7-1rem)] pr-[calc(50%/7-1.5rem)]'>
          <h3 className='heading-sb-18 text-grayscale-900'>
            {year}년 {month}월
          </h3>
          <div className='flex flex-row gap-[1.2rem]'>
            <button onClick={handlePrevMonth}>
              <Icon name='ic_back' />
            </button>
            <button onClick={handleNextMonth}>
              <Icon name='ic_next' />
            </button>
          </div>
        </div>
        <div className='grid grid-cols-7 text-center caption-r-12 text-grayscale-500 mb-2'>
          {dayLabels.map(day => (
            <span key={day} className='my-[1.2rem]'>
              {day}
            </span>
          ))}
        </div>

        <div className='grid grid-cols-7 text-center body-m-14'>
          {days.prevDates.map(day => (
            <button key={`p${day}`} className='text-grayscale-300 my-[1.15rem]'>
              {day}
            </button>
          ))}
          {days.thisDates.map(day => (
            <button key={`c${day}`} className='text-grayscale-900 my-[1.15rem]'>
              {day}
            </button>
          ))}
          {days.nextDates.map(day => (
            <button key={`n${day}`} className='text-grayscale-300 my-[1.15rem]'>
              {day}
            </button>
          ))}
        </div>
      </div>
      <div className='flex flex-row gap-[0.7rem] py-[1.7rem]'>
        <Button
          variant='cta'
          buttonStyle='sub'
          handleClickButton={handleCloseBottomSheet}
        >
          취소
        </Button>
        <Button variant='cta' buttonStyle='active'>
          적용
        </Button>
      </div>
    </div>
  );
}
