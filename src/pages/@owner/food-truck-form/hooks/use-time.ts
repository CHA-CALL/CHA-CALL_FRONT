import { useFormContext } from 'react-hook-form';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form';
import {
  FOOD_TRUCK_ERROR_MESSAGE,
  FOOD_TRUCK_MAX_LENGTH,
} from '@pages/@owner/food-truck-form/constants/food-truck';
import useToast from '@hooks/use-toast';
import type { AvailableDate } from '@pages/@owner/food-truck-form/types/available-date';

const generateDateId = () => {
  return `date_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const useTime = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FoodTruckFormData>();

  const formData = watch();
  const toast = useToast();
  const updateActiveTime = (activeTime: string) => {
    setValue('activeTime', activeTime, { shouldValidate: true });
  };

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

    // 기존 날짜 업데이트
    const updatedDates = currentDates.map(date =>
      date.id === id ? { ...date, ...dateData } : date
    );

    setValue('availableDates', updatedDates, {
      shouldValidate: true,
    });
  };

  const removeAvailableDateById = (
    event: React.MouseEvent<SVGSVGElement>,
    id: string
  ) => {
    event.stopPropagation();
    const currentDates = formData.availableDates ?? [];
    const filteredDates = currentDates.filter(date => date.id !== id);

    setValue('availableDates', filteredDates, {
      shouldValidate: true,
    });
  };

  const handleAddAvailableDate = () => {
    const currentDates = formData.availableDates ?? [];
    if (currentDates.length >= FOOD_TRUCK_MAX_LENGTH.availableDates.max) {
      toast.error(FOOD_TRUCK_ERROR_MESSAGE.availableDates.max);
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
    activeTime: formData.activeTime,
    timeDiscussRequired: formData.timeDiscussRequired,
    availableDates: availableDatesWithId,

    // Errors
    activeTimeError: errors.activeTime?.message,
    timeDiscussRequiredError: errors.timeDiscussRequired?.message,
    availableDatesError: errors.availableDates?.message,

    // Actions
    updateActiveTime,
    updateTimeDiscussRequired,
    updateAvailableDateById,
    removeAvailableDateById,
    handleAddAvailableDate,
  };
};
