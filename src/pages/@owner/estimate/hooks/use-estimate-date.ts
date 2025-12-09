import { useFormContext } from 'react-hook-form';

import { DEFAULT_DATE } from '@components/active-date/constant/default-date';
import { generateDateId } from '@utils/date/generate-date-Id';
import { isDateOverlapping } from '@utils/date/is-date-over-lapping';
import type { AvailableDate } from '@type/available-date';

import type { EstimateFormData } from '@pages/@owner/estimate/utils/estimate.schema';
import {
  ESTIMATE_ERROR_MESSAGE,
  ESTIMATE_MAX_LENGTH,
} from '@pages/@owner/estimate/constants/estimate';

export const useEstimateDate = () => {
  const {
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useFormContext<EstimateFormData>();

  const formData = watch();
  const updateAvailableDateById = (
    id: string,
    dateData: {
      startDate: string;
      endDate: string;
    }
  ) => {
    const currentDates = formData.availableDates ?? [];

    if (id === DEFAULT_DATE) {
      const newId = generateDateId();
      setValue(
        'availableDates',
        [
          ...currentDates,
          {
            id: newId,
            startDate: dateData.startDate,
            endDate: dateData.endDate,
          },
        ],
        {
          shouldValidate: true,
        }
      );
      return;
    }

    const updatedDates = currentDates.map(date =>
      date.id === id ? { ...date, ...dateData } : date
    );

    if (
      isDateOverlapping(id, dateData.startDate, dateData.endDate, currentDates)
    ) {
      setError('availableDates', {
        message: ESTIMATE_ERROR_MESSAGE.availableDates.invalid,
      });
      return;
    }

    setValue('availableDates', updatedDates, {
      shouldValidate: true,
    });
  };

  const removeAvailableDateById = (id: string) => {
    const currentDates = formData.availableDates ?? [];
    const filteredDates = currentDates.filter(date => date.id !== id);

    setValue('availableDates', filteredDates, {
      shouldValidate: true,
    });
  };

  const handleAddAvailableDate = () => {
    const currentDates = formData.availableDates ?? [];

    const hasIncompleteDates = currentDates.some(date => !date.startDate);
    if (hasIncompleteDates) {
      setError('availableDates', {
        message: ESTIMATE_ERROR_MESSAGE.availableDates.incomplete,
      });
      return;
    }

    if (currentDates.length >= ESTIMATE_MAX_LENGTH.availableDates.max) {
      setError('availableDates', {
        message: ESTIMATE_ERROR_MESSAGE.availableDates.max,
      });
      return;
    }
    const newId = generateDateId();

    setValue(
      'availableDates',
      [
        ...currentDates,
        {
          id: newId,
          startDate: '',
          endDate: '',
        },
      ],
      {
        shouldValidate: true,
      }
    );
  };

  const availableDatesWithId: AvailableDate[] = (
    formData.availableDates ?? []
  ).map((date, index) => ({
    id: date.id || `date_${index}`,
    startDate: date.startDate,
    endDate: date.endDate,
  }));

  return {
    // Data
    availableDates: availableDatesWithId,

    // Errors
    availableDatesError: errors.availableDates?.message,

    // Actions
    updateAvailableDateById,
    removeAvailableDateById,
    handleAddAvailableDate,
  };
};
