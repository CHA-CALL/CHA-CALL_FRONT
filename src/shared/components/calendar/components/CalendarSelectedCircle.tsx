import type { CalendarDate } from '@shared/types/calendar-types';

import { isSelectedDate } from '@components/calendar/utils/calendar-utils';

interface CalendarSelectedCircleProps {
  year: number;
  month: number;
  day: number;
  selectedDates: CalendarDate[];
}
export default function CalendarSelectedCircle({
  year,
  month,
  day,
  selectedDates,
}: CalendarSelectedCircleProps) {
  return (
    isSelectedDate(year, month, day, selectedDates) && (
      <div className='bg-primary-500 pointer-events-none absolute left-1/2 top-0 h-[4.4rem] w-[4.4rem] -translate-x-1/2 rounded-full' />
    )
  );
}
