import type { CalendarDate } from '@shared/components/calendar/Calendar';

import { cn } from './cn';

// 날짜 비교: 앞이면 -1, 같으면 0, 뒤면 1
export function compareDate(date1: CalendarDate, date2: CalendarDate) {
  return (
    date1.year - date2.year ||
    date1.month - date2.month ||
    date1.day - date2.day
  );
}

// 클릭하여 선택한 날짜인지
export function isSelectedDate(
  year: number,
  month: number,
  day: number,
  selectedDates: CalendarDate[]
) {
  return selectedDates.some(
    date => date.year === year && date.month === month && date.day === day
  );
}

// 선택한 날짜 중 시작 날짜인지
function isStartDate(
  year: number,
  month: number,
  day: number,
  selectedDates: CalendarDate[]
) {
  if (selectedDates.length === 0) return false;

  const earliest = selectedDates.reduce(
    (min, cur) => (compareDate(cur, min) < 0 ? cur : min),
    selectedDates[0]
  );

  return (
    earliest.year === year && earliest.month === month && earliest.day === day
  );
}

// 시작/끝을 제외한 사이 구간인지 (하이라이트를 위해서)
function isInSelectedDateRange(
  year: number,
  month: number,
  day: number,
  selectedDates: CalendarDate[]
) {
  if (selectedDates.length < 2) return null;
  const [start, end] = [...selectedDates].sort(compareDate);
  const r = { start, end };
  if (!r) return false;
  const cur = { year, month, day };
  return compareDate(cur, r.start) > 0 && compareDate(cur, r.end) < 0;
}

// 달력 각 칸 관련 스타일 클래스
export function calendarBtnClass(
  year: number,
  month: number,
  day: number,
  textClass: string,
  selectedDates: CalendarDate[]
) {
  return cn(
    'h-[4.4rem] w-full flex items-center justify-center',
    isInSelectedDateRange(year, month, day, selectedDates) && 'bg-primary-50',
    textClass,
    isSelectedDate(year, month, day, selectedDates) && 'text-white',
    isSelectedDate(year, month, day, selectedDates) &&
      selectedDates.length === 2 &&
      (isStartDate(year, month, day, selectedDates)
        ? 'bg-gradient-to-l from-primary-50 from-50% to-white to-50%'
        : 'bg-gradient-to-r from-primary-50 from-50% to-white to-50%')
  );
}
