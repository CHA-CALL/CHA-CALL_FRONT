import type { CalendarDate } from '@shared/types/calendar-types';
import { calendarBtnClass } from '@shared/components/calendar/utils/calendar-utils';
import CalendarSelectedCircle from '@shared/components/calendar/components/CalendarSelectedCircle';

interface CalendarDayButtonProps {
  year: number;
  month: number;
  day: number;
  textColor: string;
  handleClickDayButton: () => void;
  selectedDates: CalendarDate[];
}

export default function CalendarDayButton({
  year,
  month,
  day,
  textColor,
  handleClickDayButton,
  selectedDates,
}: CalendarDayButtonProps) {
  return (
    <div className='relative flex'>
      <button
        type='button'
        className={calendarBtnClass(year, month, day, textColor, selectedDates)}
        onClick={handleClickDayButton}
      >
        <span className='z-[10]'>{day}</span>
      </button>
      <CalendarSelectedCircle
        year={year}
        month={month}
        day={day}
        selectedDates={selectedDates}
      />
    </div>
  );
}
