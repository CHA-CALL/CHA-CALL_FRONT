import { useEffect, useState } from 'react';

import { Icon } from '@shared/components/icon/Icon';
import Button from '@shared/components/button/Button';

import { formatCalendarDayToDate } from '@shared/utils/date-formatter';
import type { CalendarDate, SelectedDate } from '@shared/types/calendar-types';

import {
  calendarBtnClass,
  compareDate,
  isSelectedDate,
} from '@shared/components/calendar/utils/calendar-utils';
import useCalendarDays from '@shared/components/calendar//hooks/use-calendar-days';

interface CalendarProps {
  isOpen: boolean;
  handleApplyDate: (_range: SelectedDate) => void;
  handleCloseBottomSheet: () => void;
}

const DAY_OF_THE_WEEK_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calendar({
  isOpen,
  handleApplyDate,
  handleCloseBottomSheet,
}: CalendarProps) {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [selectedDates, setSelectedDates] = useState<CalendarDate[]>([]);

  const days = useCalendarDays(year, month);

  const isPrevDisabled =
    year === currentDate.getFullYear() && month === currentDate.getMonth() + 1;

  const handlePrevMonth = () => {
    if (isPrevDisabled) return;

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

  const handleSelectDay = (y: number, m: number, d: number) => {
    const newDate: CalendarDate = { year: y, month: m, day: d };
    if (selectedDates.length === 2) {
      setSelectedDates([newDate]);
    } else {
      setSelectedDates(prev => [...prev, newDate]);
    }
  };

  const handleCompleteApplyDate = () => {
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (selectedDates.length === 1) {
      startDate = formatCalendarDayToDate(selectedDates[0]);
      endDate = null;
    } else if (selectedDates.length >= 2) {
      const [start, end] = [...selectedDates].sort(compareDate);
      startDate = formatCalendarDayToDate(start);
      endDate = formatCalendarDayToDate(end);
    }

    handleApplyDate({ startDate, endDate });
    handleCloseBottomSheet();
  };

  useEffect(() => {
    setSelectedDates([]);
  }, [isOpen]);

  const prevYM =
    month === 1
      ? { year: year - 1, month: 12 }
      : { year: year, month: month - 1 };
  const nextYM =
    month === 12
      ? { year: year + 1, month: 1 }
      : { year: year, month: month + 1 };

  const CalendarSelectedCircle = ({ year, month, day }: CalendarDate) => {
    return (
      isSelectedDate(year, month, day, selectedDates) && (
        <div className='absolute left-1/2 top-0 h-[4.4rem] w-[4.4rem] -translate-x-1/2 rounded-full bg-primary-500' />
      )
    );
  };

  return (
    <div className='relative flex h-[42.5rem] w-full flex-col justify-between'>
      <div>
        <div className='mb-[1.6rem] flex flex-row items-center justify-between pl-[calc(50%/7-1rem)] pr-[calc(50%/7-1.5rem)]'>
          <h3 className='text-grayscale-900 heading-sb-18'>
            {year}년 {month}월
          </h3>
          <div className='flex flex-row gap-[1.2rem]'>
            <button type='button' onClick={handlePrevMonth}>
              <Icon
                name='ic_back'
                color={isPrevDisabled ? '#ccced5' : '#565B65'}
              />
            </button>
            <button type='button' onClick={handleNextMonth}>
              <Icon name='ic_next' />
            </button>
          </div>
        </div>

        <div className='mb-2 grid grid-cols-7 text-center text-grayscale-500 caption-r-12'>
          {DAY_OF_THE_WEEK_LABELS.map(dayOfTheWeek => (
            <span key={dayOfTheWeek} className='my-[1.2rem]'>
              {dayOfTheWeek}
            </span>
          ))}
        </div>

        <div className='grid grid-cols-7 body-m-14'>
          {days.prevDates.map(day => (
            <div key={`p${day}`} className='relative flex'>
              <button
                type='button'
                className={calendarBtnClass(
                  prevYM.year,
                  prevYM.month,
                  day,
                  'text-grayscale-300',
                  selectedDates
                )}
                onClick={() => {
                  handlePrevMonth();
                  handleSelectDay(prevYM.year, prevYM.month, day);
                }}
              >
                <span className='z-[10]'>{day}</span>
              </button>
              <CalendarSelectedCircle
                year={prevYM.year}
                month={prevYM.month}
                day={day}
              />
            </div>
          ))}

          {days.thisDates.map(day => (
            <div key={`c${day}`} className='relative flex'>
              <button
                type='button'
                className={calendarBtnClass(
                  year,
                  month,
                  day,
                  'relative text-grayscale-900',
                  selectedDates
                )}
                onClick={() => handleSelectDay(year, month, day)}
              >
                <span className='z-[10]'>{day}</span>
              </button>
              <CalendarSelectedCircle year={year} month={month} day={day} />
            </div>
          ))}

          {days.nextDates.map(day => (
            <div key={`n${day}`} className='relative flex'>
              <button
                type='button'
                className={calendarBtnClass(
                  nextYM.year,
                  nextYM.month,
                  day,
                  'text-grayscale-300',
                  selectedDates
                )}
                onClick={() => {
                  handleNextMonth();
                  handleSelectDay(nextYM.year, nextYM.month, day);
                }}
              >
                <span className='z-[10]'>{day}</span>
              </button>
              <CalendarSelectedCircle
                year={nextYM.year}
                month={nextYM.month}
                day={day}
              />
            </div>
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
        <Button
          variant='cta'
          buttonStyle={selectedDates.length > 0 ? 'active' : 'disabled'}
          handleClickButton={handleCompleteApplyDate}
        >
          적용
        </Button>
      </div>
    </div>
  );
}
