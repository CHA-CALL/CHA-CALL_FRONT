import { useEffect, useState } from 'react';

import { useCalendarDays } from '@shared/hooks/use-calendar-days';
import {
  calendarBtnClass,
  compareDate,
  isSelectedDate,
} from '@shared/utils/calendar-utils';
import { formatCalendarDayToDate } from '@shared/utils/date-formatter';

import { Icon } from '../icon/Icon';
import Button from '../button/Button';

export interface SelectedDate {
  startDate: Date | null;
  endDate: Date | null;
}

export interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

interface CalendarProps {
  isOpen: boolean;
  handleApplyDate: (_range: SelectedDate) => void;
  handleCloseBottomSheet: () => void;
}

const dayOfTheWeekLabels = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calendar({
  isOpen,
  handleApplyDate,
  handleCloseBottomSheet,
}: CalendarProps) {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  // 최대 2개까지 선택
  const [selectedDates, setSelectedDates] = useState<CalendarDate[]>([]);

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

  // 최대 두 개 선택 가능
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

  // 이전/다음 달의 (year,month)
  const prevYM =
    month === 1
      ? { year: year - 1, month: 12 }
      : { year: year, month: month - 1 };
  const nextYM =
    month === 12
      ? { year: year + 1, month: 1 }
      : { year: year, month: month + 1 };

  // 클릭한 날짜 Circle 하이라이트 컴포넌트
  const CalendarSelectedCircle = ({ year, month, day }: CalendarDate) => {
    return (
      isSelectedDate(year, month, day, selectedDates) && (
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[4.4rem] h-[4.4rem] rounded-full bg-primary-500' />
      )
    );
  };

  return (
    <div className='w-full h-[42.5rem] relative flex flex-col justify-between'>
      <div>
        <div className='flex flex-row justify-between items-center mb-[1.6rem] pl-[calc(50%/7-1rem)] pr-[calc(50%/7-1.5rem)]'>
          <h3 className='heading-sb-18 text-grayscale-900'>
            {year}년 {month}월
          </h3>
          <div className='flex flex-row gap-[1.2rem]'>
            <button type='button' onClick={handlePrevMonth}>
              <Icon name='ic_back' />
            </button>
            <button type='button' onClick={handleNextMonth}>
              <Icon name='ic_next' />
            </button>
          </div>
        </div>

        <div className='grid grid-cols-7 text-center caption-r-12 text-grayscale-500 mb-2'>
          {dayOfTheWeekLabels.map(dayOfTheWeek => (
            <span key={dayOfTheWeek} className='my-[1.2rem]'>
              {dayOfTheWeek}
            </span>
          ))}
        </div>

        <div className='grid grid-cols-7 body-m-14'>
          {/* 이전 달 칸 */}
          {days.prevDates.map(day => (
            <div key={`p${day}`} className='flex relative'>
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

          {/* 이번 달 칸 */}
          {days.thisDates.map(day => (
            <div key={`c${day}`} className='flex relative'>
              <button
                type='button'
                className={calendarBtnClass(
                  year,
                  month,
                  day,
                  'text-grayscale-900 relative',
                  selectedDates
                )}
                onClick={() => handleSelectDay(year, month, day)}
              >
                <span className='z-[10]'>{day}</span>
              </button>
              <CalendarSelectedCircle year={year} month={month} day={day} />
            </div>
          ))}

          {/* 다음 달 칸 */}
          {days.nextDates.map(day => (
            <div key={`n${day}`} className='flex relative'>
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
