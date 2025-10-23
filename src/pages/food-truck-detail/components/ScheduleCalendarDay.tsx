import { isBefore, isWithinInterval, parseISO, startOfDay } from 'date-fns';
import { cn } from '@shared/utils/cn';

interface ScheduleCalendarDayProps {
  availableDates: string[];
  day: Date;
}

export default function ScheduleCalendarDay({
  availableDates,
  day,
}: ScheduleCalendarDayProps) {
  const today = startOfDay(new Date());
  const currentDay = startOfDay(day);

  const alreadyPassedDay = isBefore(currentDay, today);

  const isInAvailableRange = availableDates.some(range => {
    const [start, end] = range.split('~').map(d => parseISO(d));
    return isWithinInterval(currentDay, { start, end });
  });

  const dayClass = alreadyPassedDay
    ? 'line-through decoration-grayscale-200 text-grayscale-200'
    : isInAvailableRange
      ? 'text-grayscale-700'
      : 'text-grayscale-200';

  return (
    <span className={cn('py-[0.9rem] text-center', dayClass)}>
      {day.getDate()}
    </span>
  );
}
