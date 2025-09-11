import { useState, useEffect } from 'react';

import { Icon } from '@shared/components/icon/Icon';
import Button from '@shared/components/button/Button';

import { formatCalendarDayToDate } from '@shared/utils/date-formatter';
import type { CalendarDate, SelectedDate } from '@shared/types/calendar-types';

import {
  compareDate,
  formatToCalendarDate,
} from '@shared/components/calendar/utils/calendar-utils';
import useCalendarDays from '@shared/components/calendar//hooks/use-calendar-days';
import CalendarDayButton from './components/CalendarDayButton';

interface CalendarProps {
  selectedDate: SelectedDate;
  handleApplyDate: (_range: SelectedDate) => void;
  handleCloseBottomSheet: () => void;
  isOpen: boolean;
}

const DAY_OF_THE_WEEK_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calendar({
  selectedDate,
  handleApplyDate,
  handleCloseBottomSheet,
  isOpen,
}: CalendarProps) {
  const initialSelectedDate = formatToCalendarDate(selectedDate);
  const [selectedDates, setSelectedDates] =
    useState<CalendarDate[]>(initialSelectedDate);

  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  const days = useCalendarDays(year, month);

  const isPrevMonth =
    year === currentDate.getFullYear() && month === currentDate.getMonth() + 1;

  const prevYM =
    month === 1
      ? { year: year - 1, month: 12 }
      : { year: year, month: month - 1 };
  const nextYM =
    month === 12
      ? { year: year + 1, month: 1 }
      : { year: year, month: month + 1 };

  const handlePrevMonth = () => {
    if (isPrevMonth) return;

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

    const isSameCalendarDate = (a?: CalendarDate, b?: CalendarDate) =>
      !!a && !!b && a.year === b.year && a.month === b.month && a.day === b.day;

    setSelectedDates(prev => {
      if (prev.length === 0) return [newDate];

      if (prev.length === 1) {
        if (isSameCalendarDate(prev[0], newDate)) return [];
        return [prev[0], newDate];
      }

      return [newDate];
    });
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
    if (isOpen) {
      setSelectedDates(formatToCalendarDate(selectedDate));
    }
  }, [isOpen, selectedDate]);

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
                color={isPrevMonth ? '#f2f3f7' : '#565B65'}
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
            <CalendarDayButton
              key={`p${day}`}
              year={prevYM.year}
              month={prevYM.month}
              day={day}
              textColor='text-grayscale-300'
              handleClickDayButton={() =>
                handleSelectDay(prevYM.year, prevYM.month, day)
              }
              selectedDates={selectedDates}
            />
          ))}

          {days.thisDates.map(day => (
            <CalendarDayButton
              key={`c${day}`}
              year={year}
              month={month}
              day={day}
              textColor='text-grayscale-900'
              handleClickDayButton={() => handleSelectDay(year, month, day)}
              selectedDates={selectedDates}
            />
          ))}

          {days.nextDates.map(day => (
            <CalendarDayButton
              key={`n${day}`}
              year={nextYM.year}
              month={nextYM.month}
              day={day}
              textColor='text-grayscale-300'
              handleClickDayButton={() =>
                handleSelectDay(nextYM.year, nextYM.month, day)
              }
              selectedDates={selectedDates}
            />
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
