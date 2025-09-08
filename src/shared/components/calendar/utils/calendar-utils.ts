import type { CalendarDate } from '@shared/types/calendar-types';
import { cn } from '@shared/utils/cn';

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
): boolean | null {
  const hasTwoDates = selectedDates.length >= 2;
  if (!hasTwoDates) return null;

  const [start, end] = [...selectedDates].sort(compareDate);
  const current = { year, month, day };

  const isAfterStart = compareDate(current, start) > 0;
  const isBeforeEnd = compareDate(current, end) < 0;
  const isInRange = isAfterStart && isBeforeEnd;

  return isInRange;
}

// 달력 각 칸 관련 스타일 클래스
export function calendarBtnClass(
  year: number,
  month: number,
  day: number,
  textClass: string,
  selectedDates: CalendarDate[]
) {
  const isSelected = isSelectedDate(year, month, day, selectedDates);
  const isInRange = isInSelectedDateRange(year, month, day, selectedDates);
  const isStart =
    selectedDates.length === 2 && isStartDate(year, month, day, selectedDates);
  const isEnd = selectedDates.length === 2 && isSelected && !isStart;

  return cn(
    'h-[4.4rem] w-full flex items-center justify-center',
    textClass,
    isInRange && 'bg-primary-50',
    isSelected && 'text-white',
    isStart && 'bg-gradient-to-l from-primary-50 from-50% to-white to-50%',
    isEnd && 'bg-gradient-to-r from-primary-50 from-50% to-white to-50%'
  );
}
