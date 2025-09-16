import type { CalendarDate } from "@shared/types/calendar-types";

/**
 * 날짜 객체를 'YYYY / MM / DD' 형식의 문자열로 변환합니다.
 * @param date 포맷팅할 `Date` 인스턴스
 * @returns 'YYYY / MM / DD' 형식의 문자열 (예: '2025 / 09 / 09')
 */
const dateFormatter = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year} / ${month} / ${day}`;
};

/**
 * `CalendarDate`(year, month[1-12], day)를 JS `Date`로 변환합니다.
 * @param c 변환할 `CalendarDate(year, month, day)` 객체. `null` 또는 `undefined`인 경우 변환하지 않습니다.
 * @returns 변환된 `Date` 인스턴스. `c`가 없으면 `null`을 반환합니다.
 *
 */
const formatCalendarDayToDate = (c?: CalendarDate | null): Date | null => {
  return c ? new Date(c.year, c.month - 1, c.day) : null;
};

export { dateFormatter, formatCalendarDayToDate };
