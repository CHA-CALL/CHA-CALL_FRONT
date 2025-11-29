import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/schemas/food-truck-form.schema';
import {
  FOOD_TRUCK_ERROR_MESSAGE,
  FOOD_TRUCK_MAX_LENGTH,
} from '@pages/@owner/food-truck-form/constants/food-truck';
import type { AvailableDate } from '@pages/@owner/food-truck-form/types/available-date';
import { generateDateId } from '@pages/@owner/food-truck-form/utils/generate-date-Id';
import { isDateOverlapping } from '@pages/@owner/food-truck-form/utils/is-date-over-lapping';
import type { TimeType } from '@components/TimePicker/TimePicker';

export const useTime = () => {
  const {
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useFormContext<FoodTruckFormData>();

  const formData = watch();
  const [startActiveTime, setStartActiveTime] = useState<TimeType | null>(null);
  const [endActiveTime, setEndActiveTime] = useState<TimeType | null>(null);
  const updateActiveTimeStart = (activeTime: TimeType | null) => {
    setStartActiveTime(activeTime);
  };
  const updateActiveTimeEnd = (activeTime: TimeType | null) => {
    setEndActiveTime(activeTime);
  };

  useEffect(() => {
    if (!startActiveTime && !endActiveTime) {
      return;
    }
    if (!startActiveTime) {
      setError('activeTime', {
        message: FOOD_TRUCK_ERROR_MESSAGE.activeTime.start,
      });
      return;
    }
    if (!endActiveTime) {
      setError('activeTime', {
        message: FOOD_TRUCK_ERROR_MESSAGE.activeTime.end,
      });
      return;
    }
    if (startActiveTime && endActiveTime) {
      if (
        new Date(
          `1970-01-01T${startActiveTime.hour}:${startActiveTime.minute}`
        ).getTime() >=
        new Date(
          `1970-01-01T${endActiveTime.hour}:${endActiveTime.minute}`
        ).getTime()
      ) {
        setError('activeTime', {
          message: FOOD_TRUCK_ERROR_MESSAGE.activeTime.invalid,
        });
        return;
      }
      const startTimeString = `${startActiveTime.hour}:${startActiveTime.minute}`;
      const endTimeString = `${endActiveTime.hour}:${endActiveTime.minute}`;
      setValue('activeTime', startTimeString + '-' + endTimeString, {
        shouldValidate: true,
      });
    } else {
      setValue('activeTime', '', {
        shouldValidate: true,
      });
    }
  }, [startActiveTime, endActiveTime, setError, setValue]);

  useEffect(() => {
    const activeTime = formData.activeTime;

    if (!activeTime) {
      setStartActiveTime(null);
      setEndActiveTime(null);
      return;
    }

    const [startTime, endTime] = activeTime.split('-');
    const [startHour, startMinute] = startTime.split(':');
    const [endHour, endMinute] = endTime.split(':');

    setStartActiveTime({
      hour: startHour,
      minute: startMinute,
    });

    setEndActiveTime({
      hour: endHour,
      minute: endMinute,
    });
  }, [formData.activeTime]);

  const updateTimeDiscussRequired = (timeDiscussRequired: boolean) => {
    setValue('timeDiscussRequired', timeDiscussRequired, {
      shouldValidate: true,
    });
  };

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
    startActiveTime,
    endActiveTime,
    activeTime: formData.activeTime,
    timeDiscussRequired: formData.timeDiscussRequired,
    availableDates: availableDatesWithId,

    // Errors
    activeTimeError: errors.activeTime?.message,
    timeDiscussRequiredError: errors.timeDiscussRequired?.message,
    availableDatesError: errors.availableDates?.message,

    // Actions
    updateActiveTimeStart,
    updateActiveTimeEnd,
    updateTimeDiscussRequired,
    updateAvailableDateById,
    removeAvailableDateById,
    handleAddAvailableDate,
  };
};
