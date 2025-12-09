import { useEffect, useState } from 'react';
import type { UseFormSetError, UseFormSetValue } from 'react-hook-form';
import type { EstimateFormData } from '@pages/@owner/estimate/schema/estimate.schema';
import type { TimeType } from '@type/time-types';
import { ESTIMATE_ERROR_MESSAGE } from '@pages/@owner/estimate/constants/estimate';

//time, date 관련 로직
interface UseEstimateTimeProps {
  formData: EstimateFormData;
  setValue: UseFormSetValue<EstimateFormData>;
  setError: UseFormSetError<EstimateFormData>;
}

export const useEstimateTime = ({
  formData,
  setValue,
  setError,
}: UseEstimateTimeProps) => {
  const formActiveTime = formData.activeTime;

  //time 관련 로직
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
      setError('activeTime', {
        message: ESTIMATE_ERROR_MESSAGE.activeTime.start,
      });
      return;
    }
    if (!endActiveTime) {
      setError('activeTime', {
        message: ESTIMATE_ERROR_MESSAGE.activeTime.end,
      });
      return;
    }
    if (startActiveTime && endActiveTime) {
      if (isInvalidTimeRange(startActiveTime, endActiveTime)) {
        setError('activeTime', {
          message: ESTIMATE_ERROR_MESSAGE.activeTime.invalid,
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

  return {
    startActiveTime,
    endActiveTime,
    updateStartActiveTime,
    updateEndActiveTime,
  };
};
