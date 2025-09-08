import type { CalendarDate } from '@shared/components/calendar/Calendar';

export function dateFormatter(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
  const day = String(date.getDate()).padStart(2, '0');

  return `${year} / ${month} / ${day}`;
}

export function formatCalendarDayToDate(c?: CalendarDate | null): Date | null {
  return c ? new Date(c.year, c.month - 1, c.day) : null;
}
