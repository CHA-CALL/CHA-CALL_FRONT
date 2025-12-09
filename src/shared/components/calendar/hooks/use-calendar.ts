import { useEffect, useState } from 'react';

import type { CalendarDate, SelectedDate } from '@type/calendar-types';

import {
  compareDate,
  formatToCalendarDate,
  getCalendarDays,
} from '@components/calendar/utils/calendar-utils';
import { formatCalendarDayToDate } from '@utils/date/date-formatter';

export default function useCalendar(
  selectedDate: SelectedDate,
  handleApplyDate: (_range: SelectedDate) => void,
  handleCloseBottomSheet: () => void,
  isOpen: boolean
) {
  const initialSelectedDate = formatToCalendarDate(selectedDate);
  const [selectedDates, setSelectedDates] =
    useState<CalendarDate[]>(initialSelectedDate);

  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  const calendarState = {
    year,
    month,
    calendarDays: getCalendarDays(year, month),
  };

  const isPrevMonth =
    year === currentDate.getFullYear() && month === currentDate.getMonth() + 1;

  const prevYM =
    month === 1
      ? { year: year - 1, month: 12 }
      : { year: year, month: month - 1 };
  const nextYM =
    month === 12
      ? { year: year + 1, month: 1 }
      : { year: year, month: month + 1 };

  const handlePrevMonth = () => {
    if (isPrevMonth) return;

    if (month === 1) {
      setYear(prev => prev - 1);
      setMonth(12);
    } else {
      setMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(prev => prev + 1);
      setMonth(1);
    } else {
      setMonth(prev => prev + 1);
    }
  };

  const handleSelectDay = (y: number, m: number, d: number) => {
    const newDate: CalendarDate = { year: y, month: m, day: d };

    const isSameCalendarDate = (a?: CalendarDate, b?: CalendarDate) =>
      !!a && !!b && a.year === b.year && a.month === b.month && a.day === b.day;

    setSelectedDates(prev => {
      if (prev.length === 0) return [newDate];

      if (prev.length === 1) {
        if (isSameCalendarDate(prev[0], newDate)) return [];
        return [prev[0], newDate];
      }

      return [newDate];
    });
  };

  const handleCompleteApplyDate = () => {
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (selectedDates.length === 1) {
      startDate = formatCalendarDayToDate(selectedDates[0]);
      endDate = null;
    } else if (selectedDates.length >= 2) {
      const [start, end] = [...selectedDates].sort(compareDate);
      startDate = formatCalendarDayToDate(start);
      endDate = formatCalendarDayToDate(end);
    }

    handleApplyDate({ startDate, endDate });
    handleCloseBottomSheet();
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedDates(formatToCalendarDate(selectedDate));
    }
  }, [isOpen, selectedDate]);

  return {
    calendarState,
    selectedDates,
    isPrevMonth,
    prevYM,
    nextYM,
    handlePrevMonth,
    handleNextMonth,
    handleSelectDay,
    handleCompleteApplyDate,
  };
}
