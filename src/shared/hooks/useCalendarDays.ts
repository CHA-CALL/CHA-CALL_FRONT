import { useMemo } from 'react';

export interface CalendarDays {
  prevDates: number[];
  thisDates: number[];
  nextDates: number[];
}

export const useCalendarDays = (year: number, month: number): CalendarDays => {
  return useMemo(() => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const prevLastDay = new Date(year, month - 1, 0);

    const prevDates: number[] = [];
    const thisDates: number[] = [];
    const nextDates: number[] = [];

    // 지난 달 날짜 채우기
    for (let i = 0; i < firstDay.getDay(); i++) {
      prevDates.unshift(prevLastDay.getDate() - i);
    }

    // 이번 달 날짜
    for (let i = 1; i <= lastDay.getDate(); i++) {
      thisDates.push(i);
    }

    // 다음 달 날짜 채우기 (총 35칸 또는 42칸)
    const targetLength = prevDates.length + thisDates.length > 35 ? 42 : 35;
    for (
      let i = 1;
      prevDates.length + thisDates.length + nextDates.length < targetLength;
      i++
    ) {
      nextDates.push(i);
    }

    return { prevDates, thisDates, nextDates };
  }, [year, month]);
};
