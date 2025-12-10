import { useFormContext } from 'react-hook-form';

import type { AvailableDate } from '@type/available-date';
import { DEFAULT_DATE } from '@components/active-date/constant/default-date';
import { generateDateId } from '@utils/date/generate-date-Id';
import { isDateOverlapping } from '@utils/date/is-date-over-lapping';

import {
  FOOD_TRUCK_ERROR_MESSAGE,
  FOOD_TRUCK_MAX_LENGTH,
} from '@pages/@owner/food-truck-form/constants/food-truck';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/schemas/food-truck-form.schema';

export const useFoodTruckFormDate = () => {
  const {
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useFormContext<FoodTruckFormData>();

  const formAvailableDates = watch('availableDates');
  const updateAvailableDateById = (dateData: AvailableDate) => {
    const currentDates = formAvailableDates ?? [];

    if (dateData.id === DEFAULT_DATE) {
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
      setError('availableDates', {
        message: FOOD_TRUCK_ERROR_MESSAGE.availableDates.invalid,
      });
      return;
    }

    setValue('availableDates', updatedDates, {
      shouldValidate: true,
    });
  };

  const removeAvailableDateById = (id: string) => {
    const currentDates = formAvailableDates ?? [];
    const filteredDates = currentDates.filter(date => date.id !== id);

    setValue('availableDates', filteredDates, {
      shouldValidate: true,
    });
  };

  const handleAddAvailableDate = () => {
    const currentDates = formAvailableDates ?? [];

    const hasIncompleteDates = currentDates.some(date => !date.startDate);
    if (hasIncompleteDates) {
      setError('availableDates', {
        message: FOOD_TRUCK_ERROR_MESSAGE.availableDates.incomplete,
      });
      return;
    }

    if (currentDates.length >= FOOD_TRUCK_MAX_LENGTH.availableDates.max) {
      setError('availableDates', {
        message: FOOD_TRUCK_ERROR_MESSAGE.availableDates.max,
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

  const availableDatesWithId: AvailableDate[] = (formAvailableDates ?? []).map(
    (date, index) => ({
      id: date.id || `date_${index}`,
      startDate: date.startDate,
      endDate: date.endDate,
    })
  );

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
