import type { CalendarDate, SelectedDate } from '@types/calendar-types';
import { cn } from '@utils/cn';

// prop으로 들어온 SelectedDate를 CalendarDate로 변환하는 함수
const formatToCalendarDate = (selectedDate: SelectedDate) => {
  const convert = (date: Date | null): CalendarDate | null => {
    if (!date) return null;
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  };

  const start = convert(selectedDate.startDate);
  const end = convert(selectedDate.endDate);

  return [start, end].filter((d): d is CalendarDate => d !== null);
};

// 날짜 비교: 앞이면 -1, 같으면 0, 뒤면 1
const compareDate = (date1: CalendarDate, date2: CalendarDate) => {
  return (
    date1.year - date2.year ||
    date1.month - date2.month ||
    date1.day - date2.day
  );
};

// 클릭하여 선택한 날짜인지
const isSelectedDate = (
  year: number,
  month: number,
  day: number,
  selectedDates: CalendarDate[]
) => {
  return selectedDates.some(
    date => date.year === year && date.month === month && date.day === day
  );
};

// 선택한 날짜 중 시작 날짜인지
const isStartDate = (
  year: number,
  month: number,
  day: number,
  selectedDates: CalendarDate[]
) => {
  if (selectedDates.length === 0) return false;

  const earliest = selectedDates.reduce(
    (min, cur) => (compareDate(cur, min) < 0 ? cur : min),
    selectedDates[0]
  );

  return (
    earliest.year === year && earliest.month === month && earliest.day === day
  );
};

// 시작/끝을 제외한 사이 구간인지 (하이라이트를 위해서)
const isInSelectedDateRange = (
  year: number,
  month: number,
  day: number,
  selectedDates: CalendarDate[]
): boolean | null => {
  const hasTwoDates = selectedDates.length >= 2;
  if (!hasTwoDates) return null;

  const [start, end] = [...selectedDates].sort(compareDate);
  const current = { year, month, day };

  const isAfterStart = compareDate(current, start) > 0;
  const isBeforeEnd = compareDate(current, end) < 0;
  const isInRange = isAfterStart && isBeforeEnd;

  return isInRange;
};

// 지난 날인지 (선택 불가하도록)
const isPreviousDays = (year: number, month: number, day: number): boolean => {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const current = new Date(year, month - 1, day);
  return current < startOfToday; // "현재 날짜 이전"만 비활성화
};

// 달력 각 칸 관련 스타일 클래스
const calendarBtnClass = (
  year: number,
  month: number,
  day: number,
  textColor: string,
  selectedDates: CalendarDate[]
) => {
  const isPrevious = isPreviousDays(year, month, day);
  const isSelected = isSelectedDate(year, month, day, selectedDates);
  const isInRange = isInSelectedDateRange(year, month, day, selectedDates);
  const isStart =
    selectedDates.length === 2 && isStartDate(year, month, day, selectedDates);
  const isEnd = selectedDates.length === 2 && isSelected && !isStart;

  return cn(
    'h-[3.6rem] my-[0.4rem] w-full flex items-center justify-center text-center',
    textColor,
    // TODO: 텍스트 가운데 라인을 긋는 것과 아닌 것 중 어떤 것이 더 좋을지 논의
    isPrevious &&
      'pointer-events-none cursor-not-allowed line-through decoration-grayscale-300 text-grayscale-300',
    isInRange && 'bg-primary-50',
    isSelected && 'text-white',
    isStart && 'bg-gradient-to-l from-primary-50 from-50% to-white to-50%',
    isEnd && 'bg-gradient-to-r from-primary-50 from-50% to-white to-50%'
  );
};

const getCalendarDays = (year: number, month: number) => {
  const prevFillCount = new Date(year, month - 1, 1).getDay();
  const prevStart = new Date(year, month - 1, 0).getDate() - prevFillCount + 1;
  const prevDates = Array.from(
    { length: prevFillCount },
    (_, i) => prevStart + i
  );

  const thisDates = Array.from(
    { length: new Date(year, month, 0).getDate() },
    (_, i) => i + 1
  );

  const baseLen = prevDates.length + thisDates.length;
  const targetLength = baseLen > 35 ? 42 : 35;
  const nextDates = Array.from(
    { length: targetLength - baseLen },
    (_, i) => i + 1
  );

  return { prevDates, thisDates, nextDates };
};

export {
  formatToCalendarDate,
  compareDate,
  isSelectedDate,
  calendarBtnClass,
  getCalendarDays,
};
