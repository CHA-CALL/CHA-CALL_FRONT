import type { EstimateFormData } from '@pages/@owner/estimate/schema/estimate.schema';
import { isDateOverlapping } from '@pages/@owner/food-truck-form/utils/is-date-over-lapping';
import {
  ESTIMATE_ERROR_MESSAGE,
  ESTIMATE_MAX_LENGTH,
} from '@pages/@owner/estimate/constants/estimate';
import type { UseFormSetError, UseFormSetValue } from 'react-hook-form';

//time, date 관련 로직
interface UseEstimateDateProps {
  formData: EstimateFormData;
  setValue: UseFormSetValue<EstimateFormData>;
  setError: UseFormSetError<EstimateFormData>;
}

export const useEstimateDate = ({
  formData,
  setValue,
  setError,
}: UseEstimateDateProps) => {
  //date 관련 로직
  const updateAvailableDateById = (
    id: string,
    dateData: {
      id: string;
      startDate: string;
      endDate: string;
    }
  ) => {
    const currentDates = formData.availableDates ?? [];

    // 날짜가 비어있으면 겹침 체크하지 않음
    if (!dateData.startDate) {
      const existingDateIndex = currentDates.findIndex(date => date.id === id);

      if (existingDateIndex >= 0) {
        const updatedDates = currentDates.map(date =>
          date.id === id
            ? {
                ...date,
                startDate: dateData.startDate,
                endDate: dateData.endDate,
              }
            : date
        );
        setValue('availableDates', updatedDates, { shouldValidate: true });
      }
      return;
    }

    // 겹침 체크
    if (
      isDateOverlapping(id, dateData.startDate, dateData.endDate, currentDates)
    ) {
      setError('availableDates', {
        message: ESTIMATE_ERROR_MESSAGE.availableDates.invalid,
      });
      return;
    }

    const existingDateIndex = currentDates.findIndex(date => date.id === id);

    if (existingDateIndex >= 0) {
      const updatedDates = currentDates.map(date =>
        date.id === id
          ? {
              ...date,
              startDate: dateData.startDate,
              endDate: dateData.endDate,
            }
          : date
      );
      setValue('availableDates', updatedDates, { shouldValidate: true });
    }
  };

  const removeAvailableDateById = (id: string) => {
    const currentDates = formData.availableDates ?? [];
    const updatedDates = currentDates.filter(date => date.id !== id);
    setValue('availableDates', updatedDates, { shouldValidate: true });
  };

  const handleAddAvailableDate = (): string | null => {
    const currentDates = formData.availableDates ?? [];
    if (currentDates.length >= ESTIMATE_MAX_LENGTH.availableDates.max) {
      setError('availableDates', {
        message: ESTIMATE_ERROR_MESSAGE.availableDates.max,
      });
      return null;
    }

    const hasEmptyDate = currentDates.some(
      date => !date.startDate && !date.endDate
    );
    if (hasEmptyDate) {
      return null;
    }

    const newId = Date.now().toString();

    setValue(
      'availableDates',
      [...currentDates, { id: newId, startDate: '', endDate: '' }],
      { shouldValidate: true }
    );

    return newId;
  };

  return {
    handleAddAvailableDate,
    updateAvailableDateById,
    removeAvailableDateById,
  };
};
