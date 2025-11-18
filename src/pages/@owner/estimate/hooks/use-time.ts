import type { EstimateFormData } from '@pages/@owner/estimate/utils/estimate.schema';
import { isDateOverlapping } from '@pages/@owner/food-truck-form/utils/is-date-over-lapping';
import {
  ESTIMATE_ERROR_MESSAGE,
  ESTIMATE_MAX_LENGTH,
} from '@pages/@owner/estimate/constants/estimate';

//time, date 관련 로직
interface UseEstimateTimeProps {
  formData: EstimateFormData;
  setValue: any;
  setError: any;
}

export const useEstimateTime = ({
  formData,
  setValue,
  setError,
}: UseEstimateTimeProps) => {
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

  //time 관련 로직
  const updateStartActiveTime = (startActiveTime: string) => {
    if (
      !isValidActiveTime({
        startActiveTime,
        endActiveTime: formData.activeTime.endActiveTime,
      })
    ) {
      return;
    }
    setValue(
      'activeTime',
      { ...formData.activeTime, startActiveTime },
      { shouldValidate: true }
    );
  };

  const updateEndActiveTime = (endActiveTime: string) => {
    if (
      !isValidActiveTime({
        startActiveTime: formData.activeTime.startActiveTime,
        endActiveTime,
      })
    ) {
      return;
    }
    setValue(
      'activeTime',
      { ...formData.activeTime, endActiveTime },
      { shouldValidate: true }
    );
  };

  const isValidActiveTime = ({
    startActiveTime,
    endActiveTime,
  }: {
    startActiveTime: string;
    endActiveTime: string;
  }) => {
    console.log(startActiveTime, endActiveTime);
    if (!startActiveTime) {
      setError('activeTime', {
        message: ESTIMATE_ERROR_MESSAGE.activeTime.start,
      });
    }
    if (!endActiveTime) {
      setError('activeTime', {
        message: ESTIMATE_ERROR_MESSAGE.activeTime.end,
      });
    }

    if (
      new Date(`1970-01-01T${startActiveTime}`).getTime() >
      new Date(`1970-01-01T${endActiveTime}`).getTime()
    ) {
      setError('activeTime', {
        message: ESTIMATE_ERROR_MESSAGE.activeTime.invalid,
      });
      return false;
    }
    return true;
  };

  return {
    handleAddAvailableDate,
    updateAvailableDateById,
    removeAvailableDateById,
    updateStartActiveTime,
    updateEndActiveTime,
  };
};
