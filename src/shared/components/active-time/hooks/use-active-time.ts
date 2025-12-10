import { useEffect, useState } from 'react';
import { FOOD_TRUCK_ERROR_MESSAGE } from '@pages/@owner/food-truck-form/constants/food-truck';
import type { TimeType } from '@type/time-types';

interface UseActiveTimeProps {
  formActiveTime: string;
  formTimeDiscussRequired?: boolean;
  handleActiveTimeError: (_message: string) => void;
  handleActiveTimeSetValue: (_value: string) => void;
  handleTimeDiscussRequiredSetValue?: (_value: boolean) => void;
}

export const useActiveTime = ({
  formActiveTime,
  formTimeDiscussRequired,
  handleActiveTimeError,
  handleActiveTimeSetValue,
  handleTimeDiscussRequiredSetValue,
}: UseActiveTimeProps) => {
  const [startActiveTime, setStartActiveTime] = useState<TimeType | null>(null);
  const [endActiveTime, setEndActiveTime] = useState<TimeType | null>(null);

  const updateStartActiveTime = (activeTime: TimeType | null) => {
    setStartActiveTime(activeTime);
  };
  const updateEndActiveTime = (activeTime: TimeType | null) => {
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
      handleActiveTimeError(FOOD_TRUCK_ERROR_MESSAGE.activeTime.start);
      return;
    }
    if (!endActiveTime) {
      handleActiveTimeError(FOOD_TRUCK_ERROR_MESSAGE.activeTime.end);
      return;
    }
    if (startActiveTime && endActiveTime) {
      if (isInvalidTimeRange(startActiveTime, endActiveTime)) {
        handleActiveTimeError(FOOD_TRUCK_ERROR_MESSAGE.activeTime.invalid);
        return;
      }
      const startTimeString = `${startActiveTime.hour}:${startActiveTime.minute}`;
      const endTimeString = `${endActiveTime.hour}:${endActiveTime.minute}`;
      handleActiveTimeSetValue(`${startTimeString}-${endTimeString}`);
    }
  }, [
    startActiveTime,
    endActiveTime,
    handleActiveTimeError,
    handleActiveTimeSetValue,
  ]);

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
    if (handleTimeDiscussRequiredSetValue)
      handleTimeDiscussRequiredSetValue(timeDiscussRequired);
  };

  return {
    // Data
    startActiveTime,
    endActiveTime,
    timeDiscussRequired: formTimeDiscussRequired,

    // Actions
    updateStartActiveTime,
    updateEndActiveTime,
    updateTimeDiscussRequired,
  };
};
