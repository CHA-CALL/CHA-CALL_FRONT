import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import type { SelectedDate } from '@shared/types/calendar-types';

import CalendarDayButton from '@shared/components/calendar/components/CalendarDayButton';
import useCalendar from '@shared/components/calendar/hooks/use-calendar';

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
  const {
    calendarState: { year, month, calendarDays },
    selectedDates,
    isPrevMonth,
    prevYM,
    nextYM,
    handlePrevMonth,
    handleNextMonth,
    handleSelectDay,
    handleCompleteApplyDate,
  } = useCalendar(
    selectedDate,
    handleApplyDate,
    handleCloseBottomSheet,
    isOpen
  );

  return (
    <div className='relative mt-[2.8rem] flex h-[43.5rem] w-full flex-col justify-between px-[1.2rem]'>
      <div>
        <div className='mb-[1.6rem] flex flex-row items-center justify-between pl-[calc(50%/7-1rem)] pr-[calc(50%/7-1.5rem)]'>
          <h3 className='text-grayscale-900 heading-sb-18'>
            {year}년 {month}월
          </h3>
          <div className='flex flex-row gap-[1.2rem]'>
            <button type='button' onClick={handlePrevMonth}>
              <Icon
                name='ic_back'
                className={
                  isPrevMonth ? 'text-grayscale-200' : 'text-grayscale-700'
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
          {calendarDays.prevDates.map(day => (
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

          {calendarDays.thisDates.map(day => (
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

          {calendarDays.nextDates.map(day => (
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
