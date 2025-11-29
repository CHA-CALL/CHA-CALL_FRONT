import { useFormContext } from 'react-hook-form';
import type { FoodTruckFormData } from '../schemas/food-truck-form.schema';
import { generateDateId } from '../utils/generate-date-Id';
import { isDateOverlapping } from '../utils/is-date-over-lapping';
import {
  FOOD_TRUCK_ERROR_MESSAGE,
  FOOD_TRUCK_MAX_LENGTH,
} from '../constants/food-truck';
import type { AvailableDate } from '../types/available-date';

export const useActiveDate = () => {
  const {
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useFormContext<FoodTruckFormData>();

  const formData = watch();
  const updateAvailableDateById = (
    id: string,
    dateData: {
      startDate: string;
      endDate: string;
    }
  ) => {
    const currentDates = formData.availableDates ?? [];

    if (id === 'default-date') {
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
        message: FOOD_TRUCK_ERROR_MESSAGE.availableDates.invalid,
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
