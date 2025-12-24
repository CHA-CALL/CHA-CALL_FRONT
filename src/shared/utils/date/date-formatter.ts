import type { AvailableDate } from '@type/available-date';
import type { CalendarDate, SelectedDate } from '@type/calendar-types';
import { generateDateId } from '@utils/date';

/**
 * 날짜 객체를 'YYYY / MM / DD' 형식의 문자열로 변환합니다.
 * @param date 포맷팅할 `Date` 인스턴스
 * @returns 'YYYY / MM / DD' 형식의 문자열 (예: '2025 / 09 / 09')
 */
export const dateFormatter = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year} / ${month} / ${day}`;
};

/**
 * 날짜 객체를 'YYYY.MM.DD' 형식의 문자열로 변환합니다.
 * @param date 포맷팅할 `Date` 인스턴스
 * @returns 'YYYY.MM.DD' 형식의 문자열 (예: '2025.09.09')
 */
export const formatDateToDot = (date: Date | null) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

/**
 * `CalendarDate`(year, month[1-12], day)를 JS `Date`로 변환합니다.
 * @param c 변환할 `CalendarDate(year, month, day)` 객체. `null` 또는 `undefined`인 경우 변환하지 않습니다.
 * @returns 변환된 `Date` 인스턴스. `c`가 없으면 `null`을 반환합니다.
 *
 */
export const formatCalendarDayToDate = (
  c?: CalendarDate | null
): Date | null => {
  return c ? new Date(c.year, c.month - 1, c.day) : null;
};

/**
 * @param dates SelectedDate 타입의 배열
 * @returns 2025.10.05~2025.10.08 형식의 string 배열
 */
export const formatSelectedDateToSchedules = (
  dates: SelectedDate[]
): string[] => {
  return dates
    .filter(d => d.startDate !== null)
    .map(d => {
      const format = (date: Date) =>
        `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

      if (d.startDate && d.endDate) {
        return `${format(d.startDate)}~${format(d.endDate)}`;
      }
      if (d.startDate) {
        return `${format(d.startDate)}~${format(d.startDate)}`;
      }
      return '';
    })
    .filter(Boolean);
};

/**
 * 기존 견적서의 날짜를 AvailableDates 형식으로 포맷하는 함수
 * ["2025.09.20 ~ 2025.09.20", "2025.09.25 ~ 2025.09.25"]
 *  -> AvailableDate[]
 */
export const formatEstimateDatesToAvailableDates = (
  estimateDates: string[]
): AvailableDate[] => {
  return estimateDates
    .map((raw, index) => {
      // "YYYY.MM.DD ~ YYYY.MM.DD" 또는 "YYYY.MM.DD" 둘 다 대응
      const [startRaw, endRaw] = raw.split('~').map(s => s.trim());

      const startDate = startRaw ?? '';
      const endDate = endRaw ?? '';

      // startDate가 없으면 버림
      if (!startDate) return null;

      if (startDate === endDate) {
        return {
          id: `${generateDateId()}/${index}`,
          startDate,
          endDate: '',
        };
      }

      return {
        id: `${generateDateId()}/${index}`,
        startDate,
        endDate,
      };
    })
    .filter((v): v is AvailableDate => v !== null);
};
