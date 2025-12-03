import { useFormContext } from 'react-hook-form';
import type { FoodTruckFormData } from '../schemas/food-truck-form.schema';
import { useEffect, useState } from 'react';
import { FOOD_TRUCK_ERROR_MESSAGE } from '../constants/food-truck';
import type { TimeType } from '@type/time-types';

export const useActiveTime = () => {
  const {
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useFormContext<FoodTruckFormData>();

  const formActiveTime = watch('activeTime');
  const formTimeDiscussRequired = watch('timeDiscussRequired');

  const [startActiveTime, setStartActiveTime] = useState<TimeType | null>(null);
  const [endActiveTime, setEndActiveTime] = useState<TimeType | null>(null);

  const updateActiveTimeStart = (activeTime: TimeType | null) => {
    setStartActiveTime(activeTime);
  };
  const updateActiveTimeEnd = (activeTime: TimeType | null) => {
    setEndActiveTime(activeTime);
  };

  const isInvalidTimeRange = (startTime: TimeType, endTime: TimeType) => {
    const start = Number(startTime.hour) * 60 + Number(startTime.minute);
    const end = Number(endTime.hour) * 60 + Number(endTime.minute);

    return start >= end;
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
      if (isInvalidTimeRange(startActiveTime, endActiveTime)) {
        setError('activeTime', {
          message: FOOD_TRUCK_ERROR_MESSAGE.activeTime.invalid,
        });
        return;
      }
      const startTimeString = `${startActiveTime.hour}:${startActiveTime.minute}`;
      const endTimeString = `${endActiveTime.hour}:${endActiveTime.minute}`;
      setValue('activeTime', `${startTimeString}-${endTimeString}`, {
        shouldValidate: true,
      });
    }
  }, [startActiveTime, endActiveTime, setError, setValue]);

  useEffect(() => {
    const activeTime = formActiveTime;

    if (!activeTime) {
      setStartActiveTime(null);
      setEndActiveTime(null);
      return;
    }

    const [startTime, endTime] = activeTime.split('-');

    if (!startTime || !endTime) {
      // 형식이 깨졌을 경우 방어적으로 초기화
      setStartActiveTime(null);
      setEndActiveTime(null);
      return;
    }

    const [startHour, startMinute] = startTime.split(':');
    const [endHour, endMinute] = endTime.split(':');

    if (!startHour || !startMinute || !endHour || !endMinute) {
      setStartActiveTime(null);
      setEndActiveTime(null);
      return;
    }

    setStartActiveTime(prev => {
      if (prev?.hour === startHour && prev?.minute === startMinute) {
        return prev;
      }
      return { hour: startHour, minute: startMinute };
    });
    setEndActiveTime(prev => {
      if (prev?.hour === endHour && prev?.minute === endMinute) {
        return prev;
      }
      return { hour: endHour, minute: endMinute };
    });
  }, [formActiveTime]);

  const updateTimeDiscussRequired = (timeDiscussRequired: boolean) => {
    setValue('timeDiscussRequired', timeDiscussRequired, {
      shouldValidate: true,
    });
  };

  return {
    // Data
    startActiveTime,
    endActiveTime,
    timeDiscussRequired: formTimeDiscussRequired,

    // Errors
    activeTimeError: errors.activeTime?.message,

    // Actions
    updateActiveTimeStart,
    updateActiveTimeEnd,
    updateTimeDiscussRequired,
  };
};
