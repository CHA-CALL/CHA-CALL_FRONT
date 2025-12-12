import type { AvailableDate } from '@type/available-date';
import { DEFAULT_DATE } from '@components/active-date/constant/default-date';
import { generateDateId } from '@utils/date/generate-date-Id';
import { isDateOverlapping } from '@utils/date/is-date-over-lapping';
import { useMemo } from 'react';

interface UseActiveDateProps {
  formAvailableDates: AvailableDate[];
  errorMessages: {
    min: string;
    max: string;
    invalid: string;
    incomplete: string;
  };
  maxLength: number;
  handleActiveDateSetValue: (_value: AvailableDate[]) => void;
  handleActiveDateError: (_message: string) => void;
}

export const useActiveDate = ({
  formAvailableDates,
  errorMessages,
  maxLength,
  handleActiveDateSetValue,
  handleActiveDateError,
}: UseActiveDateProps) => {
  const updateAvailableDateById = (dateData: AvailableDate) => {
    const currentDates = formAvailableDates ?? [];

    if (dateData.id === DEFAULT_DATE) {
      const newId = generateDateId();
      handleActiveDateSetValue([
        ...currentDates,
        {
          id: newId,
          startDate: dateData.startDate,
          endDate: dateData.endDate,
        },
      ]);

      return;
    }

    const updatedDates = currentDates.map(date =>
      date.id === dateData.id ? { ...date, ...dateData } : date
    );

    if (
      isDateOverlapping(
        dateData.id,
        dateData.startDate,
        dateData.endDate,
        currentDates
      )
    ) {
      handleActiveDateError(errorMessages.invalid);

      return;
    }
    handleActiveDateSetValue(updatedDates);
  };

  const removeAvailableDateById = (id: string) => {
    const currentDates = formAvailableDates ?? [];
    const filteredDates = currentDates.filter(date => date.id !== id);
    handleActiveDateSetValue(filteredDates);
  };

  const handleAddAvailableDate = () => {
    const currentDates = formAvailableDates ?? [];

    const hasIncompleteDates = currentDates.some(date => !date.startDate);
    if (hasIncompleteDates) {
      handleActiveDateError(errorMessages.incomplete);
      return;
    }

    if (currentDates.length >= maxLength) {
      handleActiveDateError(errorMessages.max);
      return;
    }
    const newId = generateDateId();

    handleActiveDateSetValue([
      ...currentDates,
      {
        id: newId,
        startDate: '',
        endDate: '',
      },
    ]);
  };

  const availableDatesWithId: AvailableDate[] = useMemo(
    () =>
      (formAvailableDates ?? []).map((date, index) => ({
        id: date.id || `date_${index}`,
        startDate: date.startDate,
        endDate: date.endDate,
      })),
    [formAvailableDates]
  );

  return {
    // Data
    availableDates: availableDatesWithId,

    // Actions
    updateAvailableDateById,
    removeAvailableDateById,
    handleAddAvailableDate,
  };
};
